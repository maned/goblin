define([
        'backbone',
        'common',
        'marionette'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Routers.GlobalRouter = Backbone.Marionette.AppRouter.extend({

            appRoutes: {
                "": "index",
                "login": "login",
                "feedback": "feedback",
                "config": "config"
            }

        });
    }
);