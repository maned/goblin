define([
        'jquery',
        'backbone',
        'common',
        'marionette',
        'jquery-ui',
        'views/ConfigNavigationItemView'
    ],
    function ($, Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.ConfigNavigationView = Backbone.Marionette.CollectionView.extend({

            itemView: GOB.Views.ConfigNavigationItemView,

            tagName: 'ul',

            onRender: function () {
                this.$el.sortable({
                    revert: false
                });
            },

            convertToJson: function () {
                /* var idsInOrder = $('#nav_conf').sortable("toArray"),
                    nav_info = JSON.stringify(
                        idsInOrder.map(
                            function (e) {
                                var esc_e = e.replace(/[=]/g, "\\=");
                                var id = '#' + esc_e;
                                return {
                                    'id': e,
                                    'url': $(id).attr('data-url'),
                                    'item_name': atob(e)
                                }
                            }
                        ),
                        0, 4);

                return $.parseJSON(nav_info); */
            }

        });
    }
);