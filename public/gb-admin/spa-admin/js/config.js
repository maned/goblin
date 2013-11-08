require.config({

    //Define the base url where our javascript files live
    baseUrl: "js",

    //Set up paths to our libraries and plugins
    paths: {
        'jquery': 'vendor/jquery-2.0.3.min',
        'underscore': 'vendor/underscore.min',
        'backbone': 'vendor/backbone.min',
        'marionette': 'vendor/backbone.marionette',
        'mustache': 'vendor/mustache.min',
        'bootstrap': 'vendor/bootstrap.min',
        'common': 'common'
    },

    //Set up shims for non-AMD style libaries
    shim: {
        'underscore': {
            exports: '_'
        },

        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },

        'marionette': {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },

        'mustache': {
            exports: 'mustache'
        },

        'bootstrap': {
            deps: ['jquery']
        }
    }
});

//Initalize the App right after setting up the configuration
require([
        'backbone',
        'marionette',
        'common',
        'mustache',
        'controllers/GlobalController',
        'routers/GlobalRouter'
    ],
    function (Backbone, Marionette, Common, Mustache) {

        'use strict';

        var GOB = Common.app_namespace || {};

        //Create the Marionette Application
        GOB.Application = new Marionette.Application();

        //Add wrapper region, so we can easily swap all of our views in the controller in and out of this constant
        GOB.Application.addRegions({
            wrapper: '#wrapper'
        });

        function createRouter(controller) {

            var globalRouter = new GOB.Routers.GlobalRouter({
                controller: controller
            });

            return globalRouter;
        }

        GOB.Application.addInitializer(function () {

            //
            // Set up Initalizer (this will run as soon as the app is started). It reaches into Marionette and switches out templating system to Mustache,
            // and then creates router with controller.
            //

            Backbone.Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
                return Mustache.compile(rawTemplate);
            };

            createRouter(new GOB.Controllers.GlobalController());

        });

        GOB.Application.on("initialize:after", function () {

            //
            // Set up After Initalizer (this will run after the initializer is ran). It starts the backbone history, which is done after the routes are set.
            //

            Backbone.history.start();

        });

        //Start Application
        GOB.Application.start();

    }
);