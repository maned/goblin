define([
        'backbone',
        'common',
        'marionette'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.CustomVarsView = Backbone.Marionette.ItemView.extend({

            template: "#custom_vars_view_template"

        });
    }
);