define([
        'backbone',
        'common',
        'marionette'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.NavListItemView = Backbone.Marionette.ItemView.extend({

            template: '#nav_list_item_view_template',

            tagName: 'li',

            onRender: function () {
                this.$el.attr('id', this.model.get("id"));
                this.$el.attr('data-url', this.model.get("url"));
                this.$el.addClass('ui-state-default nav_item_count');
            }

        });
    }
);