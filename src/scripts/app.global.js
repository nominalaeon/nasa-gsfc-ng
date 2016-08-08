(function () {

    'use strict';

    angular.module('nasaApp')
        .service('appGlobal', appGlobal);

    appGlobal.$inject = ['_', 'imagesLoaded'];

    function appGlobal(_, imagesLoaded) {

        var app = {
            _global: {}
        };

        _.extend(app, getMethods(), getProperties());

        imagesLoaded(document, init);

        return app;

        ////////

        function getMethods() {
            return {
                outerHeight: outerHeight
            };
        }

        function getProperties() {
            return {
                gsfcId: '24662369@N07',
                key: 'a5e95177da353f58113fd60296e1d250',
                method: {
                    search: 'method=flickr.photos.search',
                    tags: 'method=flickr.tags.getListUserPopular'
                },
                url: 'https://api.flickr.com/services/rest/?'
            };
        }

        ////////

        function init() {
            document.querySelector('body').classList.remove('transition-disabler');
        }

        function outerHeight(el) {
            var height = el.offsetHeight;
            var style = getComputedStyle(el);

            height += parseInt(style.marginTop) + parseInt(style.marginBottom);
            return height;
        }
    }

})();