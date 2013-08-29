define([
        'backbone',
        'common',
        'marionette',
        'models/PageModel',
        'views/EditPageView',
        'views/EditWhichPageView',
        'collections/RoutesCollection'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Layouts.ManagePagesLayout = Backbone.Marionette.Layout.extend({

            template: "#manage_pages_layout_template",

            className: 'manage_pages',

            regions: {
                'editPage': '#pages_select',
                'pageTemplate': "#page_edit_fields"
            },

            onRender: function () {

                var routesCollection = new GOB.Collections.RoutesCollection(),
                    pageModel = new GOB.Models.PageModel();

                this.editPage.show(new GOB.Views.EditWhichPageView({
                    collection: routesCollection,
                    pageModel: pageModel
                }));

                this.pageTemplate.show(new GOB.Views.EditPageView({
                    model: pageModel
                }));

            }

        });
    }
);