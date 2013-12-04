define([
        'backbone',
        'common',
        'marionette'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.StandardVarsView = Backbone.Marionette.ItemView.extend({

            template: "#standard_vars_view_template"

        });
    }
);