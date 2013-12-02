define([
        'backbone',
        'common',
        'marionette',
        'views/PagesToEditOptionView'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.PagesToEditDropdownView = Backbone.Marionette.CollectionView.extend({

            itemView: GOB.Views.PagesToEditOptionView,

            tagName: 'select',

            events: {
                "change": "onChange"
            },

            onRender: function () {
                // Launch Change event on Render
                this.onChange();
            },

            onChange: function () {
                var value = this.$el.val(), // HACK: Don't use DOM for this!
                    pageModel = this.options.pageModel;

                pageModel.switchPage(value);
            }

        });
    }
);