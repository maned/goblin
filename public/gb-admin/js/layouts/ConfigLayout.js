define([
        'backbone',
        'common',
        'jquery',
        'marionette',
        'views/StandardVarsView',
        'views/CustomVarsView'
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

            onRender: function () {
                this.showStandard();
                this.showCustom();
            },

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

            },

            createNavJSON: function () {
                var idsInOrder = $('#nav_conf').sortable("toArray");

                var nav_info = JSON.stringify(
                    idsInOrder.map(
                        function (e) {
                            var esc_e = e.replace(/[=]/g, "\\=");
                            var id = '#' + esc_e;
                            return {
                                'id': e,
                                'url': $(id).attr('data-url'),
                                'theme': $(id).attr('data-theme'),
                                'item_name': atob(e)
                            }
                        }
                    ),
                    0, 4);

                return $.parseJSON(nav_info);
            }

        });
    }
);