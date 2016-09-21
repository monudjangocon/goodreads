(function () {
    'use strict';

    angular.module('app', [

        // Angular modules
        'ngRoute',
        'ngResource',
        'ngStorage',
        'ngMessages',
        'angular-clipboard',

        // Custom modules
        'app.auth',
        'app.core',
        'app.books',
        'app.home',
        'app.notify',
    ]);
})();
