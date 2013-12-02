define([
        'backbone',
        'common',
        'marionette',
        'collections/PagesToEditCollection',
        'models/PageModel',
        'views/PagesToEditDropdownView',
        'views/PageAdminAreaView'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Layouts.PageLayout = Backbone.Marionette.Layout.extend({

            template: "#page_layout_template",

            className: "admin-container",

            regions: {
                pagesToEdit: "#pages-to-edit",
                adminArea: "#admin-area"
            },

            onRender: function () {

                var pageModel = new GOB.Models.PageModel();

                this.showPagesToEdit(pageModel);
                this.showAdminArea(pageModel);

            },

            showPagesToEdit: function (pageModel) {

                var that = this,
                    pageCollection = new GOB.Collections.PagesToEditCollection();

                pageCollection.getPagesToEdit(function (data) {

                    // Set data on callback, then push new page option
                    pageCollection.set(data);

                    pageCollection.push({
                        id: "new_page",
                        item_name: "Add new page..."
                    });

                    var pagesToEditDropdown = new GOB.Views.PagesToEditDropdownView({
                        collection: pageCollection,
                        pageModel: pageModel,
                        pageLayout: that
                    });

                    that.pagesToEdit.show(pagesToEditDropdown);

                }, function (xhr) {
                    console.log('Error getting job: ' + xhr);
                });

            },

            showAdminArea: function (model) {

                this.adminArea.show(new GOB.Views.PageAdminAreaView({
                    model: model
                }));
            }

        });
    }
);