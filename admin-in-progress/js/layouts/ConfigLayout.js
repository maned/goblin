define([
        'backbone',
        'common',
        'marionette',
        'views/ConfigNavigationView'
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
                //this.nav.show(new GOB.Views.NavView());
                //this.page.show();

                var navItems = new Backbone.Collection([{
                    "id": "SG9tZQ==",
                    "url": "index.html",
                    "item_name": "Home",
                    "theme": "index.gob"
                }]);

                this.navigation.show(new GOB.Views.ConfigNavigationView({
                    collection: navItems
                }));
            }

        });
    }
);