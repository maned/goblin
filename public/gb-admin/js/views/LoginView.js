define([
        'backbone',
        'common',
        'marionette',
        'models/UserModel'
    ],
    function (Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Views.LoginView = Backbone.Marionette.ItemView.extend({

            template: "#login_view_template",

            className: "container",

            events: {
                "click .btn-login": "login"
            },

            login: function () {

                var username = this.$el.find('.username').val(),
                    password = this.$el.find('.password').val();

                this.model.login(username, password, function (data) {

                    var newUser = new GOB.Models.UserModel();

                    newUser.set(data);

                    GOB.CurrentUser = newUser;

                    window.location.hash = '#';

                }, function (xhr) {
                    alert('Login Failed. Please try again.');
                    window.location.hash = '#login';
                    console.log(xhr);
                });
            }

        });
    }
);