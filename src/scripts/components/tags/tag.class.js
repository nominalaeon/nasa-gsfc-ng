
(function () {

    'use strict';

    angular.module('nasaApp.components')
        .service('tagClassService', tagClassService);

    tagClassService.$inject = ['_'];

    function tagClassService(_) {

        // Class
        function Tag() {
            this.init.apply(this, arguments);
        }

        // Methods
        _.extend(Tag.prototype, getMethods());

        // Properties
        Object.defineProperties(Tag.prototype, getProperties());

        return Tag;

        ////////

        function getMethods() {
            var methods = {
                init: function (tag) {
                    this._tag = {};

                    for (var prop in tag) {
                        if (!tag.hasOwnProperty(prop)) {
                            continue;
                        }
                        this[prop] = tag[prop];
                    }
                }
            };

            return methods;
        }

        function getProperties() {
            var properties = {
                _content: {
                    get: function () {
                        return this._tag._content || '';
                    },
                    set: function (_content) {
                        this._tag._content = _content;
                    }
                },
                count: {
                    get: function () {
                        return this._tag.count || 0;
                    },
                    set: function (count) {
                        this._tag.count = count;
                    }
                },
                isActive: {
                    get: function () {
                        return this._tag.isActive || false;
                    },
                    set: function (isActive) {
                        this._tag.isActive = isActive;
                    }
                }
            };
            return properties;
        }

        ////////

    }
})();
