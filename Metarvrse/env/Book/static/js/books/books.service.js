(function() {
    'use strict';

    var app = angular.module('app.books');

    app.factory('bookService', bookService);
    app.factory('UserService', UserService);

    bookService.$inject = ['$resource'];
    function bookService($resource) {
        return {
            book: function(token) {
                return $resource('/api/books/:id/', null, {
                    query: {
                        method: 'GET',
                        isArray: true,
                        headers: {
                            'Authorization': 'Token ' + token
                        }
                    },
                    save: {
                        method: 'POST',
                        isArray: false,
                        headers: {
                            'Authorization': 'Token ' + token
                        }
                    },
                    delete: {
                        method: 'DELETE',
                        isArray: false,
                        headers: {
                            'Authorization': 'Token ' + token
                        }
                    },
                    update: {
                        method: 'PATCH',
                        isArray: false,
                        headers: {
                            'Authorization': 'Token ' + token
                        }
                    }
                });
            }
        };
    }

    UserService.$inject = ['$resource'];
    function UserService($resource) {
        return $resource('/api/users/:id/');
    }
})();
