
(function () {

    'use strict';

    angular.module('nasaApp.components')
        .factory('searchFactory', searchFactory);

    searchFactory.$inject = ['_', 'apiService', 'searchClassService'];

    function searchFactory(_, apiService, searchClassService) {

        var _handler = {
            _search: {}
        };

        _.extend(_handler, getMethods());
        Object.defineProperties(_handler, getProperties());

        return _handler;

        ////////

        function getMethods() {
            var methods = {
                get: get
            };
            return methods;
        }

        function getProperties() {
            var properties = {
                content_type: {
                    get: function () {
                        return _handler._search.content_type || 1;
                    },
                    set: function (content_type) {
                        _handler._search.content_type = content_type;
                    }
                },
                isAdvanced: {
                    get: function () {
                        return _handler._search.isAdvanced || false;
                    },
                    set: function (isAdvanced) {
                        _handler._search.isAdvanced = isAdvanced;
                    }
                },
                page: {
                    get: function () {
                        return _handler._search.page || 1;
                    },
                    set: function (page) {
                        _handler._search.page = page;
                    }
                },
                pages: {
                    get: function () {
                        return _handler._search.pages || 1;
                    },
                    set: function (pages) {
                        _handler._search.pages = pages;
                    }
                },
                pageOptions: {
                    get: function () {
                        return _handler._search.pageOptions || setPageOptions();
                    },
                    set: function (pageOptions) {
                        _handler._search.pageOptions = pageOptions;
                    }
                },
                perpage: {
                    get: function () {
                        return _handler.per_page; // invokes `per_page` getter/setter which has its own default value
                    },
                    set: function (perpage) {
                        /**
                         * Heads up, the API expects the snake_cased version. This getter/setter let's us use the property returned from the API by setting it on the prop expected if we make another call
                         * @type {Number}
                         */
                        _handler._search.per_page = perpage;
                    }
                },
                per_page: {
                    get: function () {
                        return _handler._search.per_page || 12;
                    },
                    set: function (per_page) {
                        /**
                         * Heads up, this property is returned as one word from the API. If you're trying to set it on this property space, you'll need to call out this snake-cased version
                         * @type {Number}
                         */
                        _handler._search.per_page = per_page;
                    }
                },
                perPageOptions: {
                    get: function () {
                        return _handler._search.perPageOptions || [6, 12, 24, 36, 66, 100];
                    },
                    set: function (perPageOptions) {
                        _handler._search.perPageOptions = perPageOptions;
                    }
                },
                sort: {
                    get: function () {
                        return _handler._search.sort || 'date-posted-desc';
                    },
                    set: function (sort) {
                        _handler._search.sort = sort;
                    }
                },
                sortOptions: {
                    value: {
                        'Date posted asc': 'date-posted-asc',
                        'Date posted desc': 'date-posted-desc',
                        'Date taken asc': 'date-taken-asc',
                        'Date taken desc': 'date-taken-desc',
                        'Interestingness desc': 'interestingness-desc',
                        'Interestingness asc': 'interestingness-asc',
                        'Relevance': 'relevance'
                    }
                },
                tags: {
                    get: function () {
                        return _handler._search.tags || '';
                    },
                    set: function (tags) {
                        _handler._search.tags = tags;
                    }
                },
                text: {
                    get: function () {
                        return _handler._search.text || 'testing';
                    },
                    set: function (text) {
                        _handler._search.text = text;
                    }
                }
            };
            return properties;
        }

        ////////

        function get(params) {
            params = params || {};
            _.extend(params, {
                content_type: this.content_type,
                per_page: this.per_page,
                sort: this.sort,
                text: this.text
            });
            return apiService.query.getSearch(params).$promise.then(setSearch.bind(this));
        }

        function getPageOptions() {
            var pages = [];

            for (var x = 1; x <= _handler.pages; x++) {
                pages.push(x);
            }
            _handler.pageOptions = pages;
            return pages;
        }

        function setSearch(results) {
            // rest current page
            this.page = 1;
            this.pages = results.photos.pages;

            return results;
        }

    }

})();
