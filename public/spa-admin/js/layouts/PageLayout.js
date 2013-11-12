define([
        'backbone',
        'common',
        'marionette'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Layouts.PageLayout = Backbone.Marionette.ItemView.extend({

            template: "#nav_view_template",

            className: "nav",

            tagName: "ul"

        });
    }
);