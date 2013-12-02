define([
        'backbone',
        'common',
        'marionette'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.PagesToEditOptionView = Backbone.Marionette.ItemView.extend({

            template: '#pages_to_edit_option_view_template',

            tagName: 'option',

            onRender: function () {
                this.$el.attr('value', this.model.get("id"));
            }

        });
    }
);