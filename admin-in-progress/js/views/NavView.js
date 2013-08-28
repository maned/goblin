define([
        'backbone',
        'common',
        'marionette',
        'bootstrap',
        'controllers/GlobalController',
        'routers/GlobalRouter'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.NavView = Backbone.Marionette.ItemView.extend({

            template: '#nav_view_template',

            tagName : 'ul',

            events: {
                "click .edit" : "sendToEdit",
                "click .config" : "sendToConfig",
                "click .logout" : "sendToLogout",
                "click .feedback" : "sendToFeedback"
            },

            sendToEdit : function() {
                this.navigateTo('edit');
            },

            sendToConfig : function() {
                this.navigateTo('config');
            },

            sendToLogout : function() {
                window.location.href = "/logout"
            },

            sendToFeedback : function() {
                this.navigateTo('feedback');
            },

            navigateTo : function(page) {

                var globalController = new GOB.Controllers.GlobalController(),
                    tempRouter = new GOB.Routers.GlobalRouter({
                        controller: globalController
                    });

                tempRouter.navigate(page, true);

                globalController.close();
            }

        });
    }
);