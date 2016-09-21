(function() {
    'use strict';

    angular
        .module('app.books')
        .controller('booksController', booksController);

    // 'isLoggedIn' is passed from the config.route.js
    booksController.$inject = ['$location', '$localStorage', '$timeout', 'isLoggedIn', 'bookService', 'UserService', 'notifyService'];

    function booksController($location, $localStorage, $timeout, isLoggedIn, bookService, UserService, notifyService) {
        var vm = this;

        if (!isLoggedIn) {
            $location.path('/');
            return;
        }

        vm.books = '';
        vm.username = $localStorage.username;
        vm.deletebook = deletebook;
        vm.newbook = newbook;
        vm.updatebook = updatebook;
        vm.copybook = copybook;

        vm.new = {
            book_name: '',
            author_name:  '',
            isbn_code: '',
            cover_image: ''
        };

        vm.edit = {
            book_name: '',
            author_name:  '',
            isbn_code: '',
            cover_image: ''
        };

        books();

        function books() {
            var query = bookService.book($localStorage.token).query();
            query.$promise
                .then(function(data) {
                    vm.books = data;
                }).catch(function(error) {
                    console.log(error);
                    vm.books = error;
                });
        }

        function deletebook(book) {
            var i;
            for (i = 0; i < vm.books.length; i++)
                if(vm.books[i].id === book.id)
                    break;

            var query = bookService.book($localStorage.token).delete({id: book.id});
            query.$promise
                .then(function(data) {
                    vm.books.splice(i, 1);
                }).catch(function(error) {
                    console.log(error);
                });
        }

        function newbook() {
            // Error checking must have at least 'book' filled out
            if (vm.new.book === '')
                return;

            var query = bookService.book($localStorage.token).save({
                book_name: vm.new.book,
                author_name: vm.new.author_name,
                isbn_code: vm.new.isbn_code,
                cover_image: vm.new.cover_image
            });

            query.$promise
                .then(function(data) {
                    vm.books.unshift(data);
                    $('#newbookModal').modal('hide');
                    notifyService.display('Added New book');
                    $timeout(function() {
                        notifyService.showMessage = false;
                    }, 3000);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function updatebook() {
            var i;
            for(i = 0; i < vm.books.length; i++)
                if (vm.books[i].id === vm.edit.id)
                    break;
            // No reason to send update request if objects are still the same
            if (angular.equals(vm.books[i], vm.edit))
                return;

            var query = bookService.book($localStorage.token).update({id: vm.edit.id}, {
                book_name: vm.edit.book,
                author_name: vm.edit.author_name,
                isbn_code: vm.edit.isbn_code,
                cover_image: vm.edit.cover_image
            });

            query.$promise
                .then(function(response) {
                    vm.books[i] = vm.edit;
                    $('#updatebookModal').modal('hide');
                    notifyService.display('Updated book');
                    $timeout(function() {
                        notifyService.showMessage = false;
                    }, 3000);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function copybook(book) {
            vm.edit = angular.copy(book);
        }
    }
})();
