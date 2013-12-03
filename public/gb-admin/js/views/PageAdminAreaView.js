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
                
                this.$el.find('#page-content').wysihtml5({
                    "stylesheets": false
                });

                if (this.model.get("page_url") === "") {
                    this.$el.find('#page-url').prop('disabled', false);
                } else {
                    this.$el.find('#page-url').prop('disabled', true);
                }
            }

        });
    }
);