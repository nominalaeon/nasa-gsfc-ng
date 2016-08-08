(function () {

    'use strict';

    angular.module('nasaApp.utils')
        .factory('imagesLoaded', imagesLoadedFactory);

    imagesLoadedFactory.$inject = ['$window'];

    function imagesLoadedFactory($window) {
        var imagesLoaded = $window.imagesLoaded;

        delete $window.imagesLoaded; // remove second imagesLoaded library

        return (imagesLoaded);
    }

})();