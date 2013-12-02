define([
        'backbone',
        'common',
        'marionette'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.PagesToEditOptionView = Backbone.Marionette.ItemView.extend({

            template: '#pages-to-edit-option-view',

            tagName: 'option',

            onRender: function () {
                this.$el.attr('value', this.model.get("id"));
            }

        });
    }
);