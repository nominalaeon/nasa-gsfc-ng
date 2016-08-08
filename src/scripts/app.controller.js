
(function () {

    'use strict';

    angular.module('nasaApp')
        .controller('NasaAppController', NasaAppController);

    NasaAppController.$inject = ['$state', '_'];

    function NasaAppController($state, _) {
        var nasa = this;

        _.extend(nasa, {
            $state: $state
        });

    }

})();
