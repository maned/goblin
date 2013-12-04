define([
        'jquery',
        'backbone',
        'common'
    ],
    function ($, Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Models.UserModel = Backbone.Model.extend({

            //Set up default values 
            defaults: {
                "auth": false
            },

            initialize: function () {
                //Set up Change Events
                this.listenTo(this, 'change', this.saveToSessionStorage);
            },

            saveToSessionStorage: function () {

                //
                //Persist the model to sessionStorage
                //

                sessionStorage.setItem("CurrentUser", JSON.stringify(this.toJSON()));
            },

            setData: function (username) {

                this.set({
                    "auth": true,
                    "username": username
                });

            },

            login: function (username, password, successCallback, failureCallback) {

                $.ajax({
                    type: "POST",
                    url: "/gb-admin/login",
                    dataType: 'json',
                    data: {
                        "username": username,
                        "password": password
                    },
                    success: function (data) {
                        successCallback(data);
                    },
                    error: function (xhr, status, error) {
                        failureCallback(xhr, status, error);
                    }
                });

            },


            logout: function (successCallback, failureCallback) {

                $.ajax({
                    type: "GET",
                    url: "/gb-admin/logout",
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