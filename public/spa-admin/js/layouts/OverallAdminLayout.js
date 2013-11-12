define([
        'backbone',
        'common',
        'marionette'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Layouts.OverallAdminLayout = Backbone.Marionette.Layout.extend({

            template: "#overall_admin_layout_template",

            className: "main_container row",

            regions: {
                nav: "#admin-navigation",
                page: "#admin-page"
            }

        });
    }
);