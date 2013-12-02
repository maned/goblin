define([
        'backbone',
        'common',
        'marionette',
        'models/PageModel',
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
                    pageModel = new GOB.Models.PageModel(),
                    pageLayout = new GOB.Layouts.PageLayout({
                        model: pageModel
                    });

                this.nav.show(navView);
                this.pages.show(pageLayout);
            }

        });
    }
);