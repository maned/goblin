var db = require('../lib/couchdb.js'),
    _ = require('underscore');

var utils = {

    deleteRoute: function (app, url) {
        //This deletes a specific route from express route mapping.
        var i = null;
        for (i = app.routes.get.length - 1; i >= 0; i--) {
            if (app.routes.get[i].path === "/" + url) {
                app.routes.get.splice(i, 1);
            }
        }
    },

    callbackEmpty: function (err, res) {
        // HACK: This is needed for cradle (the empty callback part). Undefined is returned to make JSLint happy. Is this a cradle bug?
        return undefined;
    },

    saveToAllPages: function (data) {
        // This function saves a field with data to all page documents.
        db.get('pages_routes', function navUpdate(err, doc) {

            if (err) {
                console.log(err);
            }

            _.each(doc.pure_routes, function mergeUpdate(navObj) {
                db.merge(navObj.id, data, utils.callbackEmpty);
            });
        });
    },

    checkAndSetConfig: function () {

        db.get("config_standard", function checkConfigStandard(err, doc) {

            if (err) {
                console.log(err);
            }

            if (doc === undefined) {
                db.save('config_standard', {
                    site_title: "site title",
                    site_description: "site description"
                }, utils.callbackEmpty);
            }
        });

        db.get("config_custom", function checkConfigCustom(err, doc) {

            if (err) {
                console.log(err);
            }

            if (doc === undefined) {
                db.save('config_custom', {
                    ga_id: "UA-XXXXX-X"
                }, utils.callbackEmpty);
            }
        });
    },

    checkAndSetPageRoutes: function (err, doc) {
        // If there are no page routes, make 'em!
        var routes_to_save = [{
            "id": "SG9tZQ==",
            "url": "index.html",
            "item_name": "Home"
        }];

        if (doc === undefined) {
            db.save("pages_routes", {
                pure_routes: routes_to_save
            }, function indexSelect(err, res) {

                if (err) {
                    console.log(err);
                }

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
                        }, utils.callbackEmpty);
                    }
                });
            });
        }
    },

    listeningOn: function (port) {
        console.log("Goblin lives... on port " + port);
    }
};

module.exports = utils;