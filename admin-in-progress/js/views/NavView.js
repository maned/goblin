define([
        'backbone',
        'common',
        'marionette',
        'bootstrap'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.NavView = Backbone.Marionette.ItemView.extend({

            template: '#nav_view_template',

            tagName : 'ul',

            events: {
                "click .config" : "sendToConfig",
                "click .logout" : "sendToLogout"
            },

            sendToConfig : function() {
                GOB.Application.vent.on("navigateTo", "config")
            },

            sendToLogout : function() {
                window.location.href = "/logout"
            }

        });
    }
);