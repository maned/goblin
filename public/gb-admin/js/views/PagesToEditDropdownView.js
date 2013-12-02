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

            tagName: 'select',

            itemView: GOB.Views.PagesToEditOptionView

        });
    }
);