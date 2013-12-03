define([
        'backbone',
        'common',
        'marionette',
        'models/PageModel',
        'models/UserModel',
        'views/NavView',
        'views/LoginView',
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

                var isLogin = this.options.isLogin;

                if (!isLogin) {
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
                } else {

                    var loginView = new GOB.Views.LoginView({
                        model: new GOB.Models.UserModel()
                    });

                    this.pages.show(loginView);
                }


            }

        });
    }
);