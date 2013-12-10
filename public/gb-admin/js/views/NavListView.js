define([
        'backbone',
        'common',
        'marionette',
        'jquery-ui',
        'views/NavListItemView'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.NavListView = Backbone.Marionette.CollectionView.extend({

            itemView: GOB.Views.NavListItemView,

            tagName: 'ul',

            onRender: function () {
                this.$el.sortable({
                    revert: false
                });

                this.$el.find("ul, li").disableSelection();

            },

            exportEl: function () {
                return this.$el;
            }

        });
    }
);