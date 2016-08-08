
(function () {

    'use strict';

    angular.module('nasaApp.components')
        .service('photoClassService', photoClassService);

    photoClassService.$inject = ['_'];

    function photoClassService(_) {

        // Class
        function Photo() {
            this.init.apply(this, arguments);
        }

        // Methods
        _.extend(Photo.prototype, getMethods());

        // Properties
        Object.defineProperties(Photo.prototype, getProperties());

        return Photo;

        ////////

        function getMethods() {
            var methods = {
                init: function (photo) {
                    this._photo = {};

                    for (var prop in photo) {
                        if (!photo.hasOwnProperty(prop)) {
                            continue;
                        }
                        this[prop] = photo[prop];
                    }

                    this.setSrcs();
                },
                setSrcs: setSrcs
            };

            return methods;
        }

        function getProperties() {
            var properties = {
                farm: {
                    get: function () {
                        return this._photo.farm || 0;
                    },
                    set: function (farm) {
                        this._photo.farm = farm;
                    }
                },
                id: {
                    get: function () {
                        return this._photo.id || '';
                    },
                    set: function (id) {
                        this._photo.id = id;
                    }
                },
                isfamily: {
                    get: function () {
                        return this._photo.isfamily || 0;
                    },
                    set: function (isfamily) {
                        this._photo.isfamily = isfamily;
                    }
                },
                isfriend: {
                    get: function () {
                        return this._photo.isfriend || 0;
                    },
                    set: function (isfriend) {
                        this._photo.isfriend = isfriend;
                    }
                },
                ispublic: {
                    get: function () {
                        return this._photo.ispublic || 1;
                    },
                    set: function (ispublic) {
                        this._photo.ispublic = ispublic;
                    }
                },
                owner: {
                    get: function () {
                        return this._photo.owner || '';
                    },
                    set: function (owner) {
                        this._photo.owner = owner;
                    }
                },
                secret: {
                    get: function () {
                        return this._photo.secret || '';
                    },
                    set: function (secret) {
                        this._photo.secret = secret;
                    }
                },
                server: {
                    get: function () {
                        return this._photo.server || '';
                    },
                    set: function (server) {
                        this._photo.server = server;
                    }
                },
                srcDefault: {
                    get: function () {
                        return this._photo.srcDefault || '';
                    },
                    set: function (srcDefault) {
                        this._photo.srcDefault = srcDefault;
                    }
                },
                srcLarge: {
                    get: function () {
                        return this._photo.srcLarge || '';
                    },
                    set: function (srcLarge) {
                        this._photo.srcLarge = srcLarge;
                    }
                },
                title: {
                    get: function () {
                        return this._photo.title || '';
                    },
                    set: function (title) {
                        this._photo.title = title;
                    }
                }
            };
            return properties;
        }

        ////////

        function setSrcs() {
            this.srcDefault = 'https://farm' + this.farm + '.staticflickr.com/' +
                this.server + '/' +
                this.id + '_' + this.secret + '.jpg';
            this. srcLarge = 'https://farm' + this.farm + '.staticflickr.com/' +
                this.server + '/' +
                this.id + '_' + this.secret + '_b.jpg';
        }

    }
})();
