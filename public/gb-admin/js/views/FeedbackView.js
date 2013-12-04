define([
        'backbone',
        'common',
        'marionette'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.FeedbackView = Backbone.Marionette.ItemView.extend({

            template: "#feedback_view_template"

        });
    }
);