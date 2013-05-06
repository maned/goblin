/*
 * Welcome to goblin!
 *
 * goblin is a lightweight CMS designed to serve static pages. It is written
 * entirely in javascript, using Node.js and CouchDB for the server and DB, respectively.
 *
 * Written and Developed by Nick Weingartner
 * Property of MEI (http://www.maned.com/)
 *
 */

var http = require('http')
  , util = require('util')
  , mu   = require('mu2')
  , db = require('./db')
  , express = require('express')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , app = express();

//Let the nice System Admin know the server is running.
console.log('Goblin Lives.');

//Configure Body Parser
app.configure(function() {
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'goblin_session' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
});

mu.root = __dirname + '/templates';

var DEFAULT_GOB_THEME = 'page.gob';

/*
* Configure Authentication
*/

var users = [
    { id: 1, username: 'gb-admin', password: 'admin', email: 'nick@example.com' }
];

function findById(id, fn) {
    var idx = id - 1;

    if (users[idx]) {
        fn(null, users[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
}

function findByUsername(username, fn) {
    var i    = null,
        user = null;

    for (i = 0, len = users.length; i < len; i++) {
        user = users[i];
        
        if (user.username === username) {
          return fn(null, user);
        }
    }
    return fn(null, null);
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
    function(username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
          
          // Find the user by username.  If there is no user with the given
          // username, or the password is not correct, set the user to `false` to
          // indicate failure and set a flash message.  Otherwise, return the
          // authenticated `user`.
          findByUsername(username, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
            if (user.password !== password) { return done(null, false, { message: 'Invalid password' }); }
            return done(null, user);
          });
        });
    }
));

function ensureAuthenticated(req, res, next) {
    if (req.path === '/gb-admin/login.html' || req.isAuthenticated()) {
        return next();
    }

    res.redirect('/gb-admin/login.html');
}

function routesGetandSet(data) {
    /*
    This loops through a key value set and builds routes to all needed pages
    */

    for (key in data) {
        //Create a Closure because Javascript is strange, dude!
        (function(key1) {
          //In the looping, make sure you don't take the ID or Revision Number from the DB
            if (key1 !== "_id" && key1 !== "_rev") {
                //Set route for value
                app.get('/' + data[key1], function(req, res) {
                    //Go into the DB and get that information, man!
                    db.get(key1, function (err, doc) {
                        var stream = mu.compileAndRender(DEFAULT_GOB_THEME, doc);
                        stream.pipe(res);
                    });
                });
            }
        })(key);
    }

    //Set up the Index Page, by Default.
    app.get('/', function(req, res) {
        db.get('SG9tZQ==', function (err, doc) {
            var stream = mu.compileAndRender(DEFAULT_GOB_THEME, doc);
            stream.pipe(res);
        });
    });
}

function deleteRoute(url) {

  /*
   This deletes a specific route from express route mapping.
  */

  var i = null;

    for (i = app.routes.get.length - 1; i >= 0; i--) {
        if (app.routes.get[i].path === "/" + url) {
            app.routes.get.splice(i, 1);
        }
    }
}

function saveToAllPages(data) {
    // This function saves a field with data to all page documents.
    db.get('pages_routes', function (err, doc) {
        for (key in doc.pure_routes) {
            //Create a Closure because Javascript is strange, dude!
            (function(key1) {
                //Go into the DB and get that information, man!
                db.merge(key1, data, function (err, res) {
                    console.log('saved to ' + key1);
                });
            })(key);
        }
    });
}

//Check to see if key databases exist, and if not, build the necessary components so goblin can run!
db.get('admin_config', function (err, doc) {
    if (doc === undefined) {
         db.save('admin_config', {
            ga_id: "UA-XXXXX-X",
            nav: [
               {
                   "id": "SG9tZQ==",
                   "url": "index.html",
                   "item_name": "Home"
               }],
            site_title : "site title",
            site_description : "site description"
        }, function (err, res) {
            console.log('admin_config document created.');
        });
    }

});

db.get('pages_routes', function (err, doc) {

    var routes_to_save = {
       "SG9tZQ==": "index.html"
    };

    if (doc === undefined) {
        db.save("pages_routes", {
            pure_routes: routes_to_save
        }, function (err, res) {

            db.get("SG9tZQ==", function(err, doc) {

                if (doc === undefined) {
                    db.save("SG9tZQ==", {
                        page_title: "Home",
                        page_content: "Initial Home Content",
                        page_url: "index.html",
                        meta_description: "Default goblin page",
                        meta_keywords: "goblin, CMS, javascript",
                        ga_id: "UA-XXXXX-X",
                        nav: [
                           {
                               "id": "SG9tZQ==",
                               "url": "index.html",
                               "item_name": "Home"
                           }
                        ],
                        site_title : "site title",
                        site_description : "site description"
                    }, function (err, res) {
                        routesGetandSet(routes_to_save);
                        console.log('Default Routes Document Created and routes set.');
                    });
                }
            });
            
        }); 
    } else {
       routesGetandSet(doc.pure_routes); 
    }
   
});

//Set up Static File for Components
app.use(express.static(__dirname + '/components'));

//Set up Login Post
app.post('/login.json', 
    passport.authenticate('local', { failureRedirect: '/gb-admin/login.html' }),
    function(req, res) {
        res.redirect('/gb-admin/index.html');
});

//Set up Logout call
app.get('/gb-admin/logout.html', function(req, res){
    req.logout();
    res.redirect('/gb-admin/login.html');
});

//Ensure authentication for all admin visiting
app.get('/gb-admin/*', ensureAuthenticated, function(req, res, next) {
    next();
});

//Apply the same rules for hitting it without the slash.
app.get('/gb-admin', ensureAuthenticated, function(req, res, next) {
    next();
});

//Set up gb-admin folder.
app.use("/gb-admin", express.static(__dirname + "/gb-admin"));

//Ajax Calls and Responses
app.post('/admin-save.json', function(req, res) {

    db.get(req.body.page_id, function (err, doc) {
        if (doc === undefined) {
            //The document doesn't exist, so add it to the page_routes
            db.get('pages_routes', function (err, doc) {
                var page_routes_data = doc.pure_routes;
              
                page_routes_data[req.body.page_id] = req.body.page_url;

                db.merge("pages_routes", {
                    pure_routes: page_routes_data
                }, function (err, res) {
                    console.log('New Page Routes Saved');
                });
            });

            //Then make a document and add the new info, bro.
            db.save(req.body.page_id, {
                page_title: req.body.page_title,
                page_content: req.body.page_content,
                page_url: req.body.page_url,
                meta_description: req.body.meta_description,
                meta_keywords: req.body.meta_keywords
            }, function (err, res) {

                //Create variables to be able to pass them nicely.
                var new_page_url = req.body.page_url,
                    new_page_id = req.body.page_id;

                //Add new route!
                app.get('/' + new_page_url, function(req, res) {
                    db.get(new_page_id, function (err, doc) {
                        var stream = mu.compileAndRender(DEFAULT_GOB_THEME, doc);
                        stream.pipe(res);
                    });
                });
            });

            //And add it to the admin_config to play around with!
            db.get('admin_config', function(err, doc) {
                var navigation = doc.nav,
                    objToPush  = {};

                //Push items into object
                objToPush.id = req.body.page_id;
                objToPush.url = req.body.page_url;
                objToPush.item_name = req.body.page_title;

                //Push that object into navigation
                navigation.push(objToPush);

                //Save to admin_config
                db.merge('admin_config', {
                    nav: navigation
                }, function (err, res) {
                    console.log('saved to admin_config!');
                });

                //Save the universal fields to the page document
                db.merge(req.body.page_id, {
                    ga_id: doc.ga_id,
                    nav: navigation,
                    site_title : doc.site_title,
                    site_description : doc.site_description
                }, function (err, res) {
                    console.log(' ajax post successful');
                    //Save the new navigation to all pages.
                    saveToAllPages({
                        nav: navigation
                    });
                });
            });

        } else {
            //It exists, so just merge the new info
            db.merge(req.body.page_id, {
                page_title: req.body.page_title,
                page_content: req.body.page_content,
                page_url: req.body.page_url,
                meta_description: req.body.meta_description,
                meta_keywords: req.body.meta_keywords
            }, function (err, res) {
                console.log(' ajax post successful');
            });
        }
    });

    res.contentType('json');
    res.send({ some: JSON.stringify({response:'success'}) });

});

app.post('/page-edit.json', function(req, res) {
    db.get(req.body.page_id, function (err, doc) {
        res.contentType('json');
        res.send(doc);
    });
 });

app.post('/get-pages.json', function(req, res) {
    db.get('pages_routes', function (err, doc) {
        res.contentType('json');
        res.send(doc.pure_routes);
    });
});

app.post('/admin-delete.json', function(req, res) {
    var page_id = req.body.page_id,
        page_url = req.body.page_url;

    //Remove reference to it in Page Routes
    db.get('pages_routes', function (err, doc) {
        var page_routes_data = doc.pure_routes;
      
        delete page_routes_data[page_id];

        db.merge("pages_routes", {
            pure_routes: page_routes_data
        }, function (err, res) {
            console.log('New Page Routes Saved');
        });

    });

    db.get('admin_config', function (err, doc) {

        var navigation = doc.nav,
            i          = null;

      //Loop through array and remove route.
        for (i = 0; i < navigation.length; i++) {
            if (navigation[i].id === page_id) {
                navigation.splice(i,1);
            }
        }

        db.merge("admin_config", {
            nav: navigation
        }, function (err, res) {
            console.log('Deleted from admin_config');
        });

        //Save to All Pages so there's no dead links!
        saveToAllPages({
            nav: navigation
        });

    });

    //Get the Database revision number so we can properly remove it
    db.get(req.body.page_id, function (err, doc) {
        //Remove the document, man!
        db.remove(req.body.page_id, doc._rev, function (err, res) {
            console.log('document removed');
        });
    });

    //Delete Route to that Page from Express
    deleteRoute(page_url);

    res.contentType('json');
    res.send({ some: JSON.stringify({response:'success'}) });
 });

//Config Page
app.post('/config-page.json', function(req, res) {
    db.get("admin_config", function (err, doc) {
        res.contentType('json');
        res.send(doc);
    });
});

//Config Save
app.post('/config-save.json', function(req, res) {

    var ga_id_req = req.body.ga_id,
        nav_req = req.body.nav,
        site_title_req = req.body.site_title,
        site_description_req = req.body.site_description;

    //Go ahead and save it to all the pages!
    saveToAllPages({
        ga_id: ga_id_req,
        nav: nav_req,
        site_title : site_title_req,
        site_description : site_description_req
    });

    //The merge it into the reference document, so we can load it easily later!
    db.merge('admin_config', {
        ga_id: ga_id_req,
        nav: nav_req,
        site_title : site_title_req,
        site_description : site_description_req
    }, function (err, res) {
        console.log('saved to admin_config');
    });

    //Send Response
    res.contentType('json');
    res.send({ some: JSON.stringify({response:'success'}) });
 });


//LOGIN PAGE
app.post('/login',
    passport.authenticate('local'),
    
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/users/' + req.user.username);
    });

app.listen(8000);
