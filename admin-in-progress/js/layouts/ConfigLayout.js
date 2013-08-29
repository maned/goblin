define([
        'backbone',
        'common',
        'marionette',
        'views/ConfigNavigationView',
        'collections/RoutesCollection'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Layouts.ConfigLayout = Backbone.Marionette.Layout.extend({

            template: "#config_layout_template",

            className: 'config',

            regions: {
                'editPage': '#edit_page_field',
                'navigation': "#navigation"
            },

            onRender: function () {

                var navItems = new GOB.Collections.RoutesCollection();

                this.navigation.show(new GOB.Views.ConfigNavigationView({
                    collection: navItems
                }));
            }

        });
    }
);