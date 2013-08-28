define([
        'jquery',
        'marionette',
        'backbone',
        'common',
        'bootstrap',
        'layouts/AdminLayout',
        'layouts/ConfigLayout',
        'views/NavView',
        'views/FeedbackView'
    ],
    function ($, Marionette, Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Controllers.GlobalController = Marionette.Controller.extend({

            index: function() {
                var nav = new GOB.Views.NavView();

                nav.navigateTo('edit');
            },

            edit : function () {

                var adminLayout = new GOB.Layouts.AdminLayout();
                
                GOB.Application.wrapper.show(adminLayout);

                adminLayout.nav.show(new GOB.Views.NavView())
                
                adminLayout.page.show(new GOB.Layouts.ManagePagesLayout());

            },

            login : function() {
                
            },

            config : function() {

                var adminLayout = new GOB.Layouts.AdminLayout();
                
                GOB.Application.wrapper.show(adminLayout);

                adminLayout.nav.show(new GOB.Views.NavView());
                
                adminLayout.page.show(new GOB.Layouts.ConfigLayout());
                
            },

            feedback: function() {

                var adminLayout = new GOB.Layouts.AdminLayout();
                
                GOB.Application.wrapper.show(adminLayout);

                adminLayout.nav.show(new GOB.Views.NavView());
                
                adminLayout.page.show(new GOB.Views.FeedbackView());
            }

        });
    }
);