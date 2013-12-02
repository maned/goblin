define([
        'backbone',
        'common',
        'jquery',
        'models/PageOptionModel'
    ],
    function (Backbone, Common, $) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Collections.PagesToEditCollection = Backbone.Collection.extend({

            model: GOB.Models.PageOptionModel,

            getPagesToEdit: function (successCallback, failureCallback) {

                $.ajax({
                    type: "GET",
                    url: "/gb-admin/get-pages.json",
                    dataType: 'json',
                    success: function (data) {
                        successCallback(data);
                    },
                    error: function (xhr, status, error) {
                        failureCallback(xhr, status, error);
                    }
                });
            }

        });
    }
);