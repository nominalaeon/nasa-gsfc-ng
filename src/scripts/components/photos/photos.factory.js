
(function () {

    'use strict';

    angular.module('nasaApp.components')
        .factory('photosFactory', photosFactory);

    photosFactory.$inject = ['$rootScope', '_', 'apiService', 'photoClassService'];

    function photosFactory($rootScope, _, apiService, photoClassService) {

        var _handler = {
            _photo: {}
        };

        _.extend(_handler, getMethods());
        Object.defineProperties(_handler, getProperties());

        return _handler;

        ////////

        function getMethods() {
            var methods = {
                getPhotos: getPhotos,
                setPhotos: setPhotos
            };
            return methods;
        }

        function getProperties() {
            var properties = {
                page: {
                    get: function () {
                        return _handler._photo.page || 1;
                    },
                    set: function (page) {
                        _handler._photo.page = page;
                    }
                },
                pages: {
                    get: function () {
                        return _handler._photo.pages || 1;
                    },
                    set: function (pages) {
                        _handler._photo.pages = pages;
                    }
                },
                perpage: {
                    get: function () {
                        return _handler._photo.perpage || 100;
                    },
                    set: function (perpage) {
                        _handler._photo.perpage = perpage;
                    }
                },
                photos: {
                    get: function () {
                        return _handler._photo.photos || [];
                    },
                    set: function (photos) {
                        _handler._photo.photos = photos;
                    }
                },
                total: {
                    get: function () {
                        return _handler._photo.total || 0;
                    },
                    set: function (total) {
                        _handler._photo.total = total;
                    }
                }

            };
            return properties;
        }

        ////////

        function getPhotos(params) {
            params = params || {};
            var promise = apiService.query.getPhotos(params).$promise;
            return promise.then(setPhotos.bind(this));
        }

        function setPhotos(results) {
            var photos = results.photos.photo; // wat
            
            this.photoClasses = [];
            photos.forEach(setPhoto.bind(this));
            this.photos = this.photoClasses;

            delete this.photoClasses;

            $rootScope.$broadcast('readyPhotos');

            return;
        }
        function setPhoto(photo) {
            var photoClass = new photoClassService(photo);
            this.photoClasses.push(photoClass);
        }

    }

})();
