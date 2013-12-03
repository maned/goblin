define([
        'backbone',
        'common',
        'marionette',
        'collections/PagesToEditCollection',
        'collections/ThemesCollection',
        'models/PageModel',
        'views/PagesToEditDropdownView',
        'views/PageAdminAreaView',
        'views/ThemesDropdownView'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Layouts.PageLayout = Backbone.Marionette.Layout.extend({

            template: "#page_layout_template",

            className: "admin-container",

            regions: {
                pagesToEdit: "#pages-to-edit",
                adminArea: "#admin-area",
                themeOptions: "#theme-options"
            },

            events: {
                "click .page-save": "savePage",
                "click .page-delete": "deletePage"
            },

            onRender: function () {

                this.showPagesToEdit();
                this.showAdminArea();
                this.showThemeOptions();

            },

            showPagesToEdit: function () {

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
                        pageModel: that.model,
                        pageLayout: that
                    });

                    that.pagesToEdit.show(pagesToEditDropdown);

                }, function (xhr) {
                    console.log('Error getting job: ' + xhr);
                });

            },

            showAdminArea: function () {
                var that = this;

                this.adminArea.show(new GOB.Views.PageAdminAreaView({
                    model: that.model
                }));
            },

            showThemeOptions: function () {

                var themeCollection = new GOB.Collections.ThemesCollection(),
                    that = this;

                themeCollection.getThemes(function (data) {

                    themeCollection.set(data);

                    var themeDropdown = new GOB.Views.ThemesDropdownView({
                        collection: themeCollection
                    });

                    that.themeOptions.show(themeDropdown);

                }, function (xhr) {
                    console.log('Failed to get theme files: ' + xhr);
                });
            },

            savePage: function () {
                this.model.savePage(function (data) {
                    alert('Page saved successfully');
                }, function (xhr) {
                    console.log('Page update/creation has failed. Please try again.');
                    console.log(xhr);
                });
            },

            deletePage: function () {
                console.log("Delete has not yet been implemented");
            }

        });
    }
);