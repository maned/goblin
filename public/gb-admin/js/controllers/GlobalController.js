define([
        'marionette',
        'common',
        'backbone',
        'layouts/OverallAdminLayout'
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

                var overallAdminLayout = new GOB.Layouts.OverallAdminLayout({
                    isLogin: false
                });

                GOB.Application.wrapper.show(overallAdminLayout);

            },

            login: function () {

                var overallAdminLayout = new GOB.Layouts.OverallAdminLayout({
                    isLogin: true
                });

                GOB.Application.wrapper.show(overallAdminLayout);
            }

        });
    }
);