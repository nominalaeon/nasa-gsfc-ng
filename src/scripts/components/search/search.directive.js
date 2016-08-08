(function () {

    'use strict';

    angular.module('nasaApp.components')
        .directive('search', searchDirective);

    function searchDirective () {
        var directive =  {
            restrict: 'EA',
            replace: true,
            templateUrl: 'templates/search/search.tmpl.html',
            controller: SearchController,
            controllerAs: 'search'
        };

        return directive;
    }

    SearchController.$inject = ['$element', '_', 'appGlobal', 'photosFactory', 'searchFactory', 'tagsFactory'];

    function SearchController ($element, _, appGlobal, photosFactory, searchFactory, tagsFactory) {

        var search = this;

        _.extend(search, {
            sf: searchFactory,
            tf: tagsFactory,

            onClickToggle: onClickToggle,
            onSubmit: onSubmit,

            isAdvanced: true
        });

        init();

        function init () {
            setHeights();
        }

        function onClickToggle() {
            searchFactory.isAdvanced = !searchFactory.isAdvanced;
        }

        function onSubmit() {
            var params = {
                tags: searchFactory.isAdvanced ? tagsFactory.getActive() : []
            };
            return searchFactory.get(params).then(setPhotos);
        }

        function setHeights() {
            var headerH = appGlobal.outerHeight(document.querySelector('header'));
            var windowH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            var searchH = windowH - headerH;
            $element.css({
                height: searchH + 'px'
            });
        }

        function setPhotos(results) {
            return photosFactory.setPhotos(results);
        }

    }
})();