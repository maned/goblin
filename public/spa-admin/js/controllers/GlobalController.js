define([
        'marionette',
        'common',
        'backbone'
    ],
    function (Marionette, Common) {

        'use strict';

        var GOB = Common.app_namespace || {};

        GOB.Controllers.GlobalController = Marionette.Controller.extend({

            index: function () {

                console.log('index has been hit!'); 
                
            }

        });
    }
);