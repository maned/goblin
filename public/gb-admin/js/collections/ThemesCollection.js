define([
        'backbone',
        'common',
        'jquery',
        'models/ThemeModel'
    ],
    function (Backbone, Common, $) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Collections.ThemesCollection = Backbone.Collection.extend({

            model: GOB.Models.ThemeModel,

            getThemes: function (successCallback, failureCallback) {

                $.ajax({
                    url: "/gb-admin/admin-theme-files.json",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        successCallback(data);
                    },
                    error: function (xhr) {
                        failureCallback(xhr);
                    }
                });

            }

        });
    }
);