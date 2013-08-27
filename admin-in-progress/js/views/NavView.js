define([
        'backbone',
        'common',
        'marionette',
        'bootstrap'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.NavView = Backbone.Marionette.ItemView.extend({

            template: '#nav_view_template',

            tagName : 'ul',

            events: {

            }

        });
    }
);