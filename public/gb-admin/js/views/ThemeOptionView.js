define([
        'backbone',
        'common',
        'marionette'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.ThemeOptionView = Backbone.Marionette.ItemView.extend({

            template: '#theme_option_view_template',

            tagName: 'option',

            onRender: function () {
                this.$el.attr('value', this.model.get("fileName"));
            }

        });
    }
);