define([
        'backbone',
        'common',
        'marionette',
        'views/NavView',
        'layouts/PageLayout'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Layouts.OverallAdminLayout = Backbone.Marionette.Layout.extend({

            template: "#overall_admin_layout_template",

            className: "main_container row",

            regions: {
                nav: "#admin-navigation",
                pages: "#admin-page"
            },

            onRender: function () {

                // Create Navigation view and page layat, then show them.
                var navView = new GOB.Views.NavView({
                    overallAdminLayout: this
                }),
                    pageLayout = new GOB.Layouts.PageLayout();

                this.nav.show(navView);
                this.pages.show(pageLayout);
            }

        });
    }
);