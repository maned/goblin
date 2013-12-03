define([
        'backbone',
        'common',
        'marionette'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.NavView = Backbone.Marionette.ItemView.extend({

            template: "#nav_view_template",

            className: "nav",

            tagName: "ul",

            events: {
                "click .logout": "logout"
            },

            logout: function () {

                GOB.CurrentUser.logout(function (data) {
                    if (data.success === true) {
                        GOB.CurrentUser.clear();
                        window.location.hash = "#login";
                    }
                });
            }

        });
    }
);