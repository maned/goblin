define([
        'jquery',
        'backbone',
        'common',
        'marionette'
    ],
    function ($, Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.ConfigNavigationItemView = Backbone.Marionette.ItemView.extend({

            template: "#config_nav_item_template",

            tagName: "li",

            className: "config_item",

            appendHtml: function (collectionView, itemView) {

                var model = itemView.model;

                itemView.$el.attr("id", model.get("id"));

            }

        });
    }
);