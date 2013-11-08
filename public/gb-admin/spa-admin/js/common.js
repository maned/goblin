define([

], function () {

    'use strict';

    // Create the App Namespace
    var GOB = {
        Application: {},
        Models: {},
        Layouts: {},
        Collections: {},
        Routers: {},
        Controllers: {},
        Views: {}
    };

    //Return an object with what we want to share with other modules
    return {
        app_namespace: GOB
    };

});