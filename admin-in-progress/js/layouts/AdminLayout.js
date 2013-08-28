define([
        'backbone',
        'common',
        'marionette',
        'views/NavView',
        'layouts/ManagePagesLayout'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Layouts.AdminLayout = Backbone.Marionette.Layout.extend({

            template: "#admin_layout_template",

            className: 'columns row-fluid',

            regions: {
                nav: "#nav",
                page: "#page"
            },

            onRender: function () {
                this.nav.show(new GOB.Views.NavView());
            }

        });
    }
);