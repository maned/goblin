require.config({

    baseUrl: "js",

    paths: {
        'jquery': 'vendor/jquery-2.0.3.min',
        'underscore': 'vendor/underscore.min',
        'backbone': 'vendor/backbone.min',
        'marionette': 'vendor/backbone.marionette',
        'mustache': 'vendor/mustache.min',
        'bootstrap': 'vendor/bootstrap.min',
        'common': 'common',
        'wysiwyg': 'vendor/wysihtml5/bootstrap-wysihtml5'
    },

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
        },

        'wysiwyg': {
            deps: ['jquery', 'bootstrap', 'vendor/wysihtml5/wysihtml5-0.3.0.min']
        }
    }
});

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

        GOB.Application = new Marionette.Application();

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

            Backbone.Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
                return Mustache.compile(rawTemplate);
            };

            createRouter(new GOB.Controllers.GlobalController());

        });

        GOB.Application.on("initialize:after", function () {

            Backbone.history.start();

        });

        GOB.Application.start();

    }
);