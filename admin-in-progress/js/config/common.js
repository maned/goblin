define([], function () {

    //Declare ECMAScript5 Strict Mode first and foremost
    'use strict';

    // Create the App Namespace
    var GOB = {
        Application: {},
        Models: {},
        Layouts: {},
        Collections: {},
        Routers: {},
        Controllers: {},
        Views: {},
        Active_User: {}
    };

    //Return an object with what we want to share with other modules
    return {
        app_namespace: GOB
    };

});