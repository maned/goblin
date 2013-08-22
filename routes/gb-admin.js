
module.exports = function() {

	var auth = require('../lib/auth.js'),
		express = require('express'),
		db = require('../lib/couchdb.js'),
		fs = require('fs'),
		utils = require('../lib/utils.js'),
		_ = require('underscore'),
		app = express()

	//Ajax Calls and Responses
	app.post('/page-save.json', auth.check, function(req, res) {
	    db.get(req.body.page_id, function(err, doc) {
	        if (doc === undefined) {

	            //The document doesn't exist, so add it to the page_routes
	            db.get('pages_routes', function(err, doc) {
	                var page_routes_data = doc.pure_routes,
	                    objToPush = {}

	                objToPush.id = req.body.page_id
	                objToPush.url = req.body.page_url
	                objToPush.item_name = req.body.page_title
	                objToPush.theme = req.body.theme

	                page_routes_data.push(objToPush)

	                db.merge("pages_routes", {
	                    pure_routes: page_routes_data
	                }, utils.callbackEmpty)
	            })

	            //Then make a document and add the new info, bro.
	            db.save(req.body.page_id, {
	                page_title: req.body.page_title,
	                page_content: req.body.page_content,
	                page_url: req.body.page_url,
	                meta_description: req.body.meta_description,
	                meta_keywords: req.body.meta_keywords,
	                theme: req.body.theme
	            }, utils.callbackEmpty)

	            //And add it to the admin_config to play around with!
	            db.get('admin_config', function(err, doc) {
	                var navigation = doc.nav,
	                    objToPush = {}

	                    //Push items into object
	                objToPush.id = req.body.page_id
	                objToPush.url = req.body.page_url
	                objToPush.item_name = req.body.page_title

	                //Push that object into navigation
	                navigation.push(objToPush)

	                //Save to admin_config
	                db.merge('admin_config', {
	                    nav: navigation
	                }, utils.callbackEmpty)

	                //Save the universal fields to the page document
	                db.merge(req.body.page_id, {
	                    ga_id: doc.ga_id,
	                    nav: navigation,
	                    site_title: doc.site_title,
	                    site_description: doc.site_description
	                }, function (err, res) {
	                    //Save the new navigation to all pages.
	                    utils.saveToAllPages({
	                        nav: navigation
	                    })
	                })
	            })
	        } else {
	            //It exists, so just merge the new info
	            db.merge(req.body.page_id, {
	                page_title: req.body.page_title,
	                page_content: req.body.page_content,
	                page_url: req.body.page_url,
	                meta_description: req.body.meta_description,
	                meta_keywords: req.body.meta_keywords,
	                theme: req.body.theme
	            }, utils.callbackEmpty)

	            //HERE -- can't update!
	            db.get('pages_routes', function(err, doc) {
	                var page_routes_data = doc.pure_routes,
	                    objToPush = {}

	                var new_page_routes = _.reject(page_routes_data,
	                    function routeDeleter(navObj) {
	                        return navObj.id == req.body.page_id
	                    })

	                objToPush.id = req.body.page_id
	                objToPush.url = req.body.page_url
	                objToPush.item_name = req.body.page_title
	                objToPush.theme = req.body.theme

	                new_page_routes.push(objToPush)

	                db.merge("pages_routes", {
	                    pure_routes: new_page_routes
	                }, utils.callbackEmpty)
	            })
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

	app.post('/get-pages.json', function(req, res) {
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
	            }, utils.callbackEmpty)
	        })

	        db.get('admin_config', function adminUpdateNav(err, doc) {

	            var navigation = doc.nav,
	                i = null

	                //Loop through array and remove route.
	            for (i = 0; i < navigation.length; i++) {
	                if (navigation[i].id === page_id) {
	                    navigation.splice(i, 1)
	                }
	            }

	            db.merge("admin_config", {
	                nav: navigation
	            }, utils.callbackEmpty)

	            //Save to All Pages so there's no dead links!
	            utils.saveToAllPages({
	                nav: navigation
	            })
	        })

	        //Get the Database revision number so we can properly remove it
	        db.get(req.body.page_id, function pageDelete(err, doc) {
	            //Remove the document, man!
	            db.remove(req.body.page_id, doc._rev)
	        })

	        //Delete Route to that Page from Express
	        utils.deleteRoute(page_url)

	        res.contentType('json')
	        res.send({
	            some: JSON.stringify({
	                response: 'success'
	            })
	        })
	})

	//Config Page
	app.get('/get-config.json', function configSelect(req, res) {
	    db.get("admin_config", function configSelect2Json(err, doc) {
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
	            nav: nav_req,
	            site_title: site_title_req,
	            site_description: site_description_req
	        }, callbackEmpty)

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