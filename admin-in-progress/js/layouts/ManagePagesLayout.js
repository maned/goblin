define([
        'backbone',
        'common',
        'marionette'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Layouts.ManagePagesLayout = Backbone.Marionette.Layout.extend({

            template: "#manage_pages_layout_template",

            className: 'manage_pages',

            regions: {
                'editPage' : '#edit_page_field',
                'pageTemplate' : "#page_template_field"
            },

            onRender: function() {
                //this.nav.show(new GOB.Views.NavView());
                //this.page.show();
            }

        });
    }
);