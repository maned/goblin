define([
        'backbone',
        'common',
        'jquery',
        'marionette',
        'views/StandardVarsView',
        'views/CustomVarsView',
        'views/NavListView',
        'collections/PagesToEditCollection'
    ],
    function (Backbone, Common, $) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Layouts.ConfigLayout = Backbone.Marionette.Layout.extend({

            template: "#config_layout_template",

            regions: {
                standardVars: "#standard-vars",
                navigation: "#nav-vars",
                customVars: "#custom-vars"
            },

            events: {
                "click .config-save": "save"
            },

            onRender: function () {
                this.showStandard();
                this.showCustom();
                this.showNavigation();
            },

            $navEl: null,

            showStandard: function () {

                var that = this;

                this.model.getStandard(function (data) {
                    var model = new Backbone.Model();
                    model.set(data);
                    that.standardVars.show(new GOB.Views.StandardVarsView({
                        model: model
                    }));
                }, function (xhr) {
                    console.log('Error fetching standard metadata. ' + xhr);
                });
            },

            showNavigation: function () {

                var pageCollection = new GOB.Collections.PagesToEditCollection(),
                    that = this;

                pageCollection.getPagesToEdit(function (data) {

                    // Set data on callback, then push new page option
                    pageCollection.set(data);

                    var navList = new GOB.Views.NavListView({
                        collection: pageCollection
                    });

                    that.$navEl = navList.exportEl();

                    that.navigation.show(navList);


                }, function (xhr) {
                    console.log('Error getting pages: ' + xhr);
                });

            },

            showCustom: function () {
                var that = this;

                this.model.getCustom(function (data) {
                    var model = new Backbone.Model();
                    model.set(data);

                    that.customVars.show(new GOB.Views.CustomVarsView({
                        model: model
                    }));

                }, function (xhr) {
                    console.log('Error fetching custom metadata. ' + xhr);
                });
            },

            save: function () {

            var that = this,
                    data = {
                        site_title: $('#site-title').val(),
                        site_description: $('#site-description').val(),
                        nav: this.createNavJSON(that.$navEl),
                        ga_id: $('#ga-id').val()
                    };

                this.model.save(data, function () {
                    alert('Configuration data saved!');
                    that.render();
                }, function (xhr) {
                    console.log('Error saving data. ' + xhr);
                });


            },

            createNavJSON: function ($navEl) {

                var idsInOrder = $navEl.sortable("toArray");

                var nav_info = JSON.stringify(
                    idsInOrder.map(
                        function (e) {
                            var esc_e = e.replace(/[=]/g, "\\=");
                            var id = '#' + esc_e;
                            return {
                                'id': e,
                                'url': $(id).attr('data-url'),
                                'theme': $(id).attr('data-theme'),
                                'item_name': window.atob(e)
                            };
                        }
                    ),
                    0, 4);

                return $.parseJSON(nav_info);
            }
        });
    }
);