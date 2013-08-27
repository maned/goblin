define([
        'jquery',
        'marionette',
        'backbone',
        'common',
        'bootstrap',
        'layouts/AdminLayout'
    ],
    function ($, Marionette, Backbone, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Controllers.GlobalController = Marionette.Controller.extend({

            index : function () {
                
                GOB.Application.wrapper.show(new GOB.Layouts.AdminLayout());

            },

            login : function() {
                
            },

            config : function() {
                alert('config');
            }

        });
    }
);