define([
        'backbone',
        'common',
        'marionette',
        'wysiwyg'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.PageAdminAreaView = Backbone.Marionette.ItemView.extend({

            template: "#page_admin_area_view_template",

            initialize: function () {
                // Bind the view to the Model
                this.listenTo(this.model, 'change', this.render, this);
            },

            onRender: function () {
                this.$el.find('#page-content').wysihtml5();
            }

        });
    }
);