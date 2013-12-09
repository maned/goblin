define([
        'backbone',
        'common',
        'jquery',
        'marionette',
        'jquery-ui',
        'views/NavListItemView'
    ],
    function (Backbone, Common, $) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.NavListView = Backbone.Marionette.CollectionView.extend({

            itemView: GOB.Views.NavListItemView,

            tagName: 'ul',

            onRender: function () {
                this.$el.sortable({
                    revert: false
                });

                this.$el.find("ul, li").disableSelection();

            },

            exportEl: function () {
                return this.$el;
            },

            createNavJSON: function () {
                var idsInOrder = this.$el.sortable("toArray");

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
                            };
                        }
                    ),
                    0, 4);

                return $.parseJSON(nav_info);
            }

        });
    }
);