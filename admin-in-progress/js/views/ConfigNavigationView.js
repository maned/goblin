define([
        'backbone',
        'common',
        'marionette',
        'jquery-ui',
        'views/ConfigNavigationItemView'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.ConfigNavigationView = Backbone.Marionette.CollectionView.extend({

            itemView: GOB.Views.ConfigNavigationItemView,

            tagName: 'ul',

            onRender: function () {
                this.$el.sortable({
                    revert: false
                });
            }

        });
    }
);