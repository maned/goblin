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

            onRender: function() {

                console.log(GOB);

                var navView = new GOB.Views.NavView({
                    overallAdminLayout: this
                });

                var pageLayout = new GOB.Layouts.PageLayout();

                this.nav.show(navView);
                this.pages.show(pageLayout);
            }

        });
    }
);