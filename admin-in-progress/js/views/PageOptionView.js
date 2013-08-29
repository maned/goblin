define([
        'jquery',
        'backbone',
        'common',
        'marionette'
    ],
    function ($, Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.PageOptionView = Backbone.Marionette.ItemView.extend({

            template: "#page_option_template",

            tagName: "option",

            appendHtml: function (collectionView, itemView) {



            }

        });
    }
);