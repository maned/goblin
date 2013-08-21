/*
 * Welcome to goblin!
 *
 * goblin is a lightweight CMS designed to serve static pages. It is written
 * entirely in javascript, using Node.js and CouchDB for the server and DB, respectively.
 *
 * Written and Developed by Nick Weingartner (nweingartner@gmail.com)
 *
 * Copyright 2013, Managing Editor Inc (http://www.maned.com/), and released under the GPLv3 (see: README for more details)
 *
 */

var mu = require('mu2'),
    db = require('./lib/couchdb.js'),
    express = require('express'),
    auth = require('./lib/auth.js'),
    _ = require('underscore'),
    fs = require('fs'),
    app = express()

//Configure Body Parser
app.configure(function() {
    app.use(express.cookieParser())
    app.use(express.session({
        key: "QAWdefrAQ",
        secret: 'asfyvhq987ertvyweiurytsdfgadekjr4yhtfsdfgt9jfwe3ht987234yh'
    }))
    app.use(express.bodyParser())
    app.use(app.router)
    //Set up Static File for Components
    app.use(express.static(__dirname + '/public'))
})

mu.root = __dirname + '/theme'

function deleteRoute(url) {
    //This deletes a specific route from express route mapping.
    var i = null
    for (i = app.routes.get.length - 1; i >= 0; i--) {
        if (app.routes.get[i].path === "/" + url) {
            app.routes.get.splice(i, 1)
        }
    }
}

function saveToAllPages(data) {
    // This function saves a field with data to all page documents.
    db.get('pages_routes', function navUpdate(err, doc) {
        _.each(doc.pure_routes, function mergeUpdate(navObj) {
            db.merge(navObj.id, data, callbackEmpty)
        });
    })
}

function checkForConfig(err, doc) {
    if (doc === undefined) {
        db.save('admin_config', {
            ga_id: "UA-XXXXX-X",
            nav: [{
                "id": "SG9tZQ==",
                "url": "index.html",
                "item_name": "Home",
                "theme": "index.gob"
            }],
            site_title: "site title",
            site_description: "site description"
        }, callbackEmpty)
    }
}

function checkAndSetPageRoutes(err, doc) {
    var routes_to_save = [{
        "id": "SG9tZQ==",
        "url": "index.html",
        "item_name": "Home",
        "theme": "index.gob"
    }]

    if (doc === undefined) {
        db.save("pages_routes", {
            pure_routes: routes_to_save
        }, function indexSelect(err, res) {
            db.get("SG9tZQ==", function indexInsertDefaults(err, doc) {
                if (doc === undefined) {
                    db.save("SG9tZQ==", {
                        page_title: "Home",
                        page_content: "Initial Home Content",
                        page_url: "index.html",
                        meta_description: "Default goblin page",
                        meta_keywords: "goblin, CMS, javascript",
                        ga_id: "UA-XXXXX-X",
                        nav: [{
                            "id": "SG9tZQ==",
                            "url": "index.html",
                            "item_name": "Home"
                        }],
                        site_title: "site title",
                        site_description: "site description",
                        theme: "index.gob"
                    }, callbackEmpty)
                }
            })
        })
    }
}

//Check to see if key databases exist, and if not, build the necessary components so goblin can run!
db.get('admin_config', checkForConfig)

//Check for 'page routes', if undefined, then create a default route, if not, then set them
db.get('pages_routes', checkAndSetPageRoutes)

//Ajax Calls and Responses
app.post('/admin-save.json', auth.check, function (req, res) {
    db.get(req.body.page_id, function (err, doc) {
        if (doc === undefined) {

            //The document doesn't exist, so add it to the page_routes
            db.get('pages_routes', function (err, doc) {
                var page_routes_data = doc.pure_routes,
                    objToPush = {}

                objToPush.id = req.body.page_id
                objToPush.url = req.body.page_url
                objToPush.item_name = req.body.page_title
                objToPush.theme = req.body.theme

                page_routes_data.push(objToPush)

                db.merge("pages_routes", {
                    pure_routes: page_routes_data
                }, callbackEmpty)
            })

            //Then make a document and add the new info, bro.
            db.save(req.body.page_id, {
                page_title: req.body.page_title,
                page_content: req.body.page_content,
                page_url: req.body.page_url,
                meta_description: req.body.meta_description,
                meta_keywords: req.body.meta_keywords,
                theme: req.body.theme
            }, callbackEmpty)

            //And add it to the admin_config to play around with!
            db.get('admin_config', function (err, doc) {
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
                }, callbackEmpty)

                //Save the universal fields to the page document
                db.merge(req.body.page_id, {
                    ga_id: doc.ga_id,
                    nav: navigation,
                    site_title: doc.site_title,
                    site_description: doc.site_description
                }, function (err, res) {
                    //Save the new navigation to all pages.
                    saveToAllPages({
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
            }, callbackEmpty)

            //HERE -- can't update!
            db.get('pages_routes', function (err, doc) {
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
                }, callbackEmpty)
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

function callbackEmpty(err, res) {
    // Handle response
}

app.post('/page-edit.json', function (req, res) {
    db.get(req.body.page_id, function (err, doc) {
        res.contentType('json')
        res.send(doc)
    })
})

app.post('/get-pages.json', function (req, res) {
    db.get('pages_routes', function (err, doc) {
        res.contentType('json')
        res.send(doc.pure_routes)
    })
})

app.post('/admin-delete.json', auth.check, function (req, res) {
    var page_id = req.body.page_id,
        page_url = req.body.page_url

        //Remove reference to it in Page Routes
        db.get('pages_routes', function (err, doc) {
            var page_routes_data = doc.pure_routes

            var new_page_routes = _.reject(page_routes_data,
                function routeDeleter(navObj) {
                    return navObj.id == page_id
                })

            db.merge("pages_routes", {
                pure_routes: new_page_routes
            }, callbackEmpty)
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
            }, callbackEmpty)

            //Save to All Pages so there's no dead links!
            saveToAllPages({
                nav: navigation
            })
        })

        //Get the Database revision number so we can properly remove it
        db.get(req.body.page_id, function pageDelete(err, doc) {
            //Remove the document, man!
            db.remove(req.body.page_id, doc._rev)
        })

        //Delete Route to that Page from Express
        deleteRoute(page_url)

        res.contentType('json')
        res.send({
            some: JSON.stringify({
                response: 'success'
            })
        })
})

//Config Page
app.post('/config-page.json', function configSelect(req, res) {
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
        saveToAllPages({
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



var html_dir = './lib/views/'

//Edit page
app.get('/gb-admin/edit', auth.check, function (req, res) {
    res.sendfile(html_dir + 'edit.html')
})

//Config Page
app.get('/gb-admin/config', auth.check, function (req, res) {
    res.sendfile(html_dir + 'config.html')
})

//Login Page
app.get('/login', function (req, res) {
    res.sendfile(html_dir + 'login.html')
})

//Set up dynamic routes for all pages
app.get('/:page_name', function(req, res) {
    db.get('pages_routes', function(err, doc) {giut
        var pure_routes = doc.pure_routes,
            requested_page = req.params.page_name, 
            page_info = _.findWhere(pure_routes, { "url" : requested_page })

        if (page_info !== undefined) {
            db.get(page_info.id, function compileAndRender(err, doc) {
                var stream = mu.compileAndRender(page_info.theme, doc)
                stream.pipe(res)
            })
        }
    })
})

app.post('/login', auth.login)
app.get('/logout', auth.logout)
app.listen(8000)