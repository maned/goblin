module.exports = function() {

    var auth = require('../lib/auth.js'),
        express = require('express'),
        db = require('../lib/couchdb.js'),
        fs = require('fs'),
        utils = require('../lib/utils.js'),
        _ = require('underscore'),
        async = require('async'),
        app = express()

    //Ajax Calls and Responses
    app.post('/page-save.json', auth.check, function(req, res) {

        var pageId = req.body.page_id

        db.get(pageId, function(err, doc) {

            var objToPush = {}

            objToPush.id = pageId
            objToPush.url = req.body.page_url
            objToPush.item_name = req.body.page_title
            objToPush.theme = req.body.theme

            if (doc === undefined) {

                /*

                async.series([
                    db.save(pageId, {
                        page_title: req.body.page_title,
                        page_content: req.body.page_content,
                        page_url: req.body.page_url,
                        meta_description: req.body.meta_description,
                        meta_keywords: req.body.meta_keywords,
                        theme: req.body.theme
                    }, utils.callbackEmpty),
                    // Grab and save standard config vars to page
                    db.get("config_standard", function (err, doc) {
                        db.merge(pageId, {
                            site_title: doc.site_title,
                            site_description: doc.site_description
                        }, utils.callbackEmpty)
                    }),
                    db.get("config_custom", function (err, doc) {
                        db.merge(pageId, {
                            ga_id : doc.ga_id
                        }, utils.callbackEmpty)
                    }),
                    //The document doesn't exist, so add it to the page_routes
                    db.get('pages_routes', function(err, doc) {
                        var page_routes_data = doc.pure_routes

                        page_routes_data.push(objToPush)

                        db.merge("pages_routes", {
                            pure_routes: page_routes_data
                        }, function(err, doc) {
                            utils.saveToAllPages({
                                nav: page_routes_data
                            })
                        })
                    })

                ]); 
                */

                db.save(pageId, {
                    page_title: req.body.page_title,
                    page_content: req.body.page_content,
                    page_url: req.body.page_url,
                    meta_description: req.body.meta_description,
                    meta_keywords: req.body.meta_keywords,
                    theme: req.body.theme
                }, function saveConfigVarsToNew(err, doc) {

                    // Grab and save standard config vars to page
                    db.get("config_standard", function (err, doc) {
                        db.merge(pageId, {
                            site_title: doc.site_title,
                            site_description: doc.site_description
                        }, function (err, doc) {
                            // Grab and save custom config vars to page
                            db.get("config_custom", function (err, doc) {
                                db.merge(pageId, {
                                    ga_id : doc.ga_id
                                }, utils.callbackEmpty)
                            })
                        })
                    })
                    

                    //The document doesn't exist, so add it to the page_routes
                    db.get('pages_routes', function(err, doc) {
                        var page_routes_data = doc.pure_routes

                        page_routes_data.push(objToPush)

                        db.merge("pages_routes", {
                            pure_routes: page_routes_data
                        }, function(err, doc) {
                            utils.saveToAllPages({
                                nav: page_routes_data
                            })
                        })
                    })

                })
                

            } else {
                //It exists, so just merge the new info
                db.merge(pageId, {
                    page_title: req.body.page_title,
                    page_content: req.body.page_content,
                    page_url: req.body.page_url,
                    meta_description: req.body.meta_description,
                    meta_keywords: req.body.meta_keywords,
                    theme: req.body.theme
                }, utils.callbackEmpty)
            }

        })

        res.contentType('json')
        res.send({
            some: JSON.stringify({
                response: 'success'
            })
        })
    })

    app.post('/page-edit.json', function(req, res) {
        db.get(req.body.page_id, function(err, doc) {
            res.contentType('json')
            res.send(doc)
        })
    })

    app.get('/get-pages.json', function(req, res) {
        db.get('pages_routes', function(err, doc) {
            res.contentType('json')
            res.send(doc.pure_routes)
        })
    })

    app.post('/page-delete.json', auth.check, function(req, res) {
        var page_id = req.body.page_id,
            page_url = req.body.page_url

            //Remove reference to it in Page Routes
            db.get('pages_routes', function(err, doc) {
                var page_routes_data = doc.pure_routes

                var new_page_routes = _.reject(page_routes_data,
                    function routeDeleter(navObj) {
                        return navObj.id == page_id
                    })

                db.merge("pages_routes", {
                    pure_routes: new_page_routes
                }, function (err, doc) {
                    utils.saveToAllPages({
                        nav: new_page_routes
                    })
                })
            })

            //Get the Database revision number so we can properly remove it
            db.get(req.body.page_id, function pageDelete(err, doc) {
                //Remove the document, man!
                db.remove(req.body.page_id, doc._rev)
            })

            //Delete Route to that Page from Express
            utils.deleteRoute(app, page_url)

            res.contentType('json')
            res.send({
                some: JSON.stringify({
                    response: 'success'
                })
            })
    })

    // Config Page
    app.get('/get-config.json', function configSelect(req, res) {
        db.get("admin_config", function configSelect2Json(err, doc) {
            res.contentType('json')
            res.send(doc)
        })
    })

    // Standard Config Variables
    app.get('/get-config-standard.json', function configStandardSelect(req, res) {
        db.get("config_standard", function configStandardSelectToJson(err, doc) {
            res.contentType('json')
            res.send(doc)
        })
    })

    // Custom Config Variables
    app.get('/get-config-custom.json', function configCustomSelect(req, res) {
        db.get("config_custom", function configCustomSelectToJson(err, doc) {
            res.contentType('json')
            res.send(doc)
        })
    })

    //Config Save
    app.post('/config-save.json', auth.check, function configUpdate(req, res) {
        var ga_id_req = req.body.ga_id,
            nav_req = req.body.nav,
            site_title_req = req.body.site_title,
            site_description_req = req.body.site_description

            //Go ahead and save it to all the pages!
            utils.saveToAllPages({
                ga_id: ga_id_req,
                nav: nav_req,
                site_title: site_title_req,
                site_description: site_description_req
            })

            //The merge it into the reference document, so we can load it easily later!
            db.merge('admin_config', {
                ga_id: ga_id_req,
                site_title: site_title_req,
                site_description: site_description_req
            }, utils.callbackEmpty)

            //Merge Standard Variables
            db.merge('config_standard', {
                site_title: site_title_req,
                site_description: site_description_req
            }, utils.callbackEmpty)

            //Merge Custom Variables
            db.merge('config_custom', {
                ga_id: ga_id_req
            }, utils.callbackEmpty)

            //Merge Page Routes
            db.merge("pages_routes", {
                pure_routes: nav_req
            }, utils.callbackEmpty)

            //Send Response
            res.contentType('json')
            res.send({
                some: JSON.stringify({
                    response: 'success'
                })
            })
    })

    app.post('/admin-theme-files.json', function adminWantsThemeFiles(req, res) {
        fs.readdir('theme', function getThemeFiles(err, files) {
            //Send Response
            res.contentType('json')
            res.send({
                response: files
            })
        })
    })

    return app;

}()