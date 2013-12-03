define([
        'marionette',
        'common',
        'backbone',
        'layouts/OverallAdminLayout',
        'models/PageModel',
        'models/UserModel',
        'views/NavView',
        'views/LoginView',
        'views/FeedbackView',
        'layouts/PageLayout'
    ],
    function (Marionette, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Controllers.GlobalController = Marionette.Controller.extend({

            index: function () {

                if (!(GOB.CurrentUser instanceof GOB.Models.UserModel)) {

                    var activeSessionUser = sessionStorage.getItem("CurrentUser");

                    if (activeSessionUser !== null && activeSessionUser !== undefined && activeSessionUser !== "{}") {

                        GOB.CurrentUser = new GOB.Models.UserModel(JSON.parse(activeSessionUser));

                    } else {

                        window.location.hash = "#login";
                        return;

                    }

                }

                var overallAdminLayout = new GOB.Layouts.OverallAdminLayout();

                GOB.Application.wrapper.show(overallAdminLayout);

                // Create Navigation view and page layout, then show them.
                var navView = new GOB.Views.NavView(),
                    pageModel = new GOB.Models.PageModel(),
                    pageLayout = new GOB.Layouts.PageLayout({
                        model: pageModel
                    });

                overallAdminLayout.nav.show(navView);
                overallAdminLayout.pages.show(pageLayout);

            },

            login: function () {

                var overallAdminLayout = new GOB.Layouts.OverallAdminLayout();

                GOB.Application.wrapper.show(overallAdminLayout);

                var loginView = new GOB.Views.LoginView({
                    model: new GOB.Models.UserModel()
                });

                overallAdminLayout.pages.show(loginView);

            },

            feedback: function () {
                var overallAdminLayout = new GOB.Layouts.OverallAdminLayout();

                GOB.Application.wrapper.show(overallAdminLayout);

                // Create Navigation view and page layout, then show them.
                var navView = new GOB.Views.NavView(),
                    feedbackView = new GOB.Views.FeedbackView();

                overallAdminLayout.nav.show(navView);
                overallAdminLayout.pages.show(feedbackView);
            },

            config: function () {
                console.log('config hit');
            }

        });
    }
);