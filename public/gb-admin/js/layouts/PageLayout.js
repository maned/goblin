define([
        'backbone',
        'common',
        'jquery',
        'marionette',
        'collections/PagesToEditCollection',
        'collections/ThemesCollection',
        'models/PageModel',
        'views/PagesToEditDropdownView',
        'views/PageAdminAreaView',
        'views/ThemesDropdownView'
    ],
    function (Backbone, Common, $) {

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
                    console.log('Error getting pages: ' + xhr);
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
                        collection: themeCollection,
                        model: that.model
                    });

                    that.themeOptions.show(themeDropdown);

                }, function (xhr) {
                    console.log('Failed to get theme files: ' + xhr);
                });
            },

            savePage: function () {
                var isNewPage = $('.page-to-edit-select').val() === "new_page" ? true : false,
                    that = this;

                this.model.savePage(function () {

                    alert('Page saved successfully');

                    // Check to see newPage boolean.
                    if (isNewPage) {
                        that.render();
                    }

                }, function (xhr) {
                    console.log('Page update/creation has failed. Please try again. ' + xhr);
                });
            },

            deletePage: function () {

                var that = this,
                    pageToDelete = $('.page-to-edit-select').val();

                // Temporary fix to stop index deletion.
                if (pageToDelete !== "SG9tZQ==") {
                    this.model.deletePage(function () {

                        alert('Page successfully deleted');

                        that.render();

                    }, function (xhr) {
                        console.log('Error deleting page. ' + xhr);
                    });
                } else {
                    alert('You cannot delete the index page.');
                }


            }

        });
    }
);