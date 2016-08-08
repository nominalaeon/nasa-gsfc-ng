(function () {

    'use strict';

    angular.module('nasaApp.components')
        .directive('header', headerDirective);

    function headerDirective () {
        var directive =  {
            restrict: 'A',
            replace: true,
            templateUrl: 'templates/header/header.tmpl.html',
            controller: HeaderController,
            controllerAs: 'header'
        };

        return directive;
    }

    HeaderController.$inject = ['_'];

    function HeaderController (_) {

        var header = this;

        _.extend(header, {
            
        });

        function init () {
            
        }

    }
})();