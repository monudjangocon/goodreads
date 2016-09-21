(function() {
    'use strict';

    angular
        .module('app.books')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', 'STATIC_URL'];

    function configFunction($routeProvider, STATIC_URL) {
        $routeProvider.when('/books', {
            templateUrl: STATIC_URL + '/books/books.html',
            controller: 'booksController',
            controllerAs: 'vm',
            resolve: {isLoggedIn: resolveUser}
        });
    }

    resolveUser.$inject = ['authService'];

    function resolveUser(authService) {
        return authService.isLoggedIn();
    }
})();
