define([
        'jquery',
        'backbone',
        'common',
        'models/RouteModel'
    ],
    function ($, Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Collections.RoutesCollection = Backbone.Collection.extend({

            // Make collection from NoteModel
            model: GOB.Models.RouteModel,

            initialize: function () {
                //this.grabRoutes(this.setCollection);

                this.setCollection([{
                    "id": "SG9tZQ==",
                    "url": "index.html",
                    "item_name": "Home",
                    "theme": "index.gob"
                }]);
            },

            setCollection: function (data) {
                this.set(data);
            },

            grabRoutes: function (successCallback, failureCallback) {
                //Make ajax call and paint values
                $.ajax({
                    url: "http://localhost:8000/gb-admin/get-routes.json",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        if (successCallback !== undefined) {
                            successCallback(data);
                        }
                    },
                    error: function (xhr) {
                        if (failureCallback !== undefined) {
                            failureCallback(xhr);
                        }
                    }
                });
            }

        });
    }
);