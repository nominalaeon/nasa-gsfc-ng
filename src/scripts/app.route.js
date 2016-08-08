
(function () {

    'use strict';

    angular.module('nasaApp')
        .config(nasaAppRoute);

    nasaAppRoute.$inject = ['$httpProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider'];

    function nasaAppRoute($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

        var title = 'NASA Goddard Space Flight Center';

        $locationProvider.html5Mode(true).hashPrefix('!');

        $stateProvider
            .state('nasaApp', {
                controller: 'AdvancedSearchController',
                controllerAs: 'advSearch',
                templateUrl: 'templates/advanced-search/advanced-search.tmpl.html',
                title: 'Home: ' + title
            })
            .state('nasaApp.home', {
                controller: 'AdvancedSearchController',
                controllerAs: 'advSearch',
                templateUrl: 'templates/advanced-search/advanced-search.tmpl.html',
                title: 'Home: ' + title,
                url: '/'
            });

        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/');

    }

})();
