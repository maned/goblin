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
    app = express(),
    utils = require('./lib/utils.js'),
    config = require('./lib/config.js')

//Configure Body Parser
app.configure(function() {
    app.use(express.cookieParser())
    app.use(express.session({
        key: "QAWdefrAQ",
        secret: 'asfyvhq987ertvyweiurytsdfgadekjr4yhtfsdfgt9jfwe3ht987234yh'
    }))
    app.use(express.bodyParser())
    app.use('/gb-admin', require('./routes/gb-admin'));
    app.use(app.router)
    //Set up Static File for Components
    app.use(express.static(__dirname + '/public'))
})

mu.root = __dirname + '/theme'

//Check for 'page routes', if undefined, then create a default route, if not, then set them
db.get('pages_routes', utils.checkAndSetPageRoutes)

//Check to see if key databases exist, and if not, build the necessary components so goblin can run!
utils.checkAndSetConfig()

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
app.get('/login', function(req, res) {
    res.sendfile(html_dir + 'login.html')
})

//Set up dynamic routes for all pages
app.get('/:page_name', function(req, res) {

    db.get('pages_routes', function(err, doc) {
        var pure_routes = doc.pure_routes,
            requested_page = req.params.page_name, 
            page_info = _.findWhere(pure_routes, { "url" : requested_page })

        if (page_info !== undefined) {
            db.get(page_info.id, function compileAndRender(err, doc) {
                var stream = mu.compileAndRender(page_info.theme, doc)
                stream.pipe(res)
            })
        } else {
            res.redirect('/index.html')
        }
    })

})

//Default '/' to index.html
app.get('/', function(req, res) {
    res.redirect('/index.html')
})

app.post('/login', auth.login)
app.get('/logout', auth.logout)
app.listen(config.desiredPort, utils.listeningOn(config.desiredPort))