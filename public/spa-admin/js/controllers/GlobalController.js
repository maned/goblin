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

                console.log('index has been hit!');

                var overallAdminLayout = new GOB.Layouts.OverallAdminLayout();

                GOB.Application.wrapper.show(overallAdminLayout);

            }

        });
    }
);