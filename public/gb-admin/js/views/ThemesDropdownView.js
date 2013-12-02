define([
        'backbone',
        'common',
        'marionette',
        'views/ThemeOptionView'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.ThemesDropdownView = Backbone.Marionette.CollectionView.extend({

            itemView: GOB.Views.ThemeOptionView,

            tagName: 'select'

        });
    }
);