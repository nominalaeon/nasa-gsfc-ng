
(function () {

    'use strict';

    angular.module('nasaApp.components')
        .service('searchClassService', searchClassService);

    searchClassService.$inject = ['_'];

    function searchClassService(_) {

        // Class
        function Search() {
            this.init.apply(this, arguments);
        }

        // Methods
        _.extend(Search.prototype, getMethods());

        // Properties
        Object.defineProperties(Search.prototype, getProperties());

        return Search;

        ////////

        function getMethods() {
            var methods = {
                init: function (search) {
                    this._search = {};

                    for (var prop in search) {
                        if (!search.hasOwnProperty(prop)) {
                            continue;
                        }
                        this[prop] = search[prop];
                    }
                }
            };

            return methods;
        }

        function getProperties() {
            var properties = {
                _content: {
                    get: function () {
                        return this._search._content || '';
                    },
                    set: function (_content) {
                        this._search._content = _content;
                    }
                }
            };
            return properties;
        }

        ////////

    }
})();
