(function () {

    'use strict';

    angular.module('nasaApp.pages')
        .controller('AdvancedSearchController', AdvancedSearchController);

    AdvancedSearchController.$inject = ['$rootScope', '$scope', '$timeout', '_', 'imagesLoaded', 'photosFactory', 'searchFactory', 'tagsFactory'];

    function AdvancedSearchController($rootScope, $scope, $timeout, _, imagesLoaded, photosFactory, searchFactory, tagsFactory) {

        var advSearch = this;

        _.extend(advSearch, {
            pf: photosFactory,

            root: document.querySelector('.adv-search')
        });

        init();

        function init() {
            var tagParams = {
                count: 20
            };
            var tagPromise = tagsFactory.getTags(tagParams);

            searchFactory.isAdvanced = true;

            bindEvents();
        }

        function bindEvents() {
            var stopListener = $rootScope.$on('readyPhotos', function () {
                stopListener();
                $timeout(listenForImageLoad);
            });
        }

        function listenForImageLoad() {
            imagesLoaded(advSearch.root, function (one, two) {
                searchFactory.isAdvanced = false;
                $scope.$apply();
            });
        }
        
    }

})();
