define([
        'backbone',
        'common',
        'marionette'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Layouts.ConfigLayout = Backbone.Marionette.Layout.extend({

            template: "#config_layout_template",

            className: 'config',

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