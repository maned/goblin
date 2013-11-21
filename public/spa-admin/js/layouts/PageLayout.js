define([
        'backbone',
        'common',
        'marionette'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Layouts.PageLayout = Backbone.Marionette.ItemView.extend({

            template: "#page_layout_template",

            className: "admin-container",

            regions: {
                pagesToEdit: "#pages-to-edit",
                adminArea: "#admin-area"
            }

        });
    }
);