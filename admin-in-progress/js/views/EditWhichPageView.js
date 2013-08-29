define([
        'jquery',
        'backbone',
        'common',
        'marionette',
        'views/PageOptionView'
    ],
    function ($, Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.EditWhichPageView = Backbone.Marionette.CollectionView.extend({

            itemView: GOB.Views.PageOptionView,

            tagName: 'select'

        });
    }
);