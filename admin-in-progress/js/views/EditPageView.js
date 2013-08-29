define([
        'backbone',
        'common',
        'marionette',
        'wysiwyg'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.EditPageView = Backbone.Marionette.ItemView.extend({

            template: '#page_edit_fields_template',

            className: 'edit_page_container',

            onRender: function () {

                //this.$el.find('.page_content').wysihtml5();
            }

        });
    }
);