/**
 * @ngdoc overview
 * @name nasaApp
 */

(function () {

    'use strict';

    angular.module('nasaApp', [
        'ngResource',
        'ui.router',
        'nasaApp.components',
        'nasaApp.pages',
        'nasaApp.utils'
    ]);

})();


(function () {

    'use strict';

    angular.module('nasaApp')
        .config(nasaAppRoute);

    nasaAppRoute.$inject = ['$httpProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider'];

    function nasaAppRoute($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

        var title = 'NASA Goddard Space Flight Center';

        $locationProvider.html5Mode(true).hashPrefix('!');

        $stateProvider
            .state('nasaApp', {
                controller: 'AdvancedSearchController',
                controllerAs: 'advSearch',
                templateUrl: 'templates/advanced-search/advanced-search.tmpl.html',
                title: 'Home: ' + title
            })
            .state('nasaApp.home', {
                controller: 'AdvancedSearchController',
                controllerAs: 'advSearch',
                templateUrl: 'templates/advanced-search/advanced-search.tmpl.html',
                title: 'Home: ' + title,
                url: '/'
            });

        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/');

    }

})();

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

(function () {

    'use strict';

    angular.module('nasaApp.utils', []);

})();

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
(function () {

    'use strict';

    angular.module('nasaApp.utils')
        .factory('_', lodashFactory);

    lodashFactory.$inject = ['$window'];

    function lodashFactory($window) {
        var _ = $window._;

        // delete($window._); // remove second Lodash library
        delete $window._;  // remove second Lodash library

        return (_);
    }

})();

(function () {

    'use strict';

    angular.module('nasaApp.pages', []);

})();

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

(function () {

    'use strict';

    angular.module('nasaApp.components', []);

})();

(function () {

    'use strict';

    angular.module('nasaApp.components')
        .service('apiService', apiService);

    apiService.$inject = ['$resource', 'appGlobal'];

    function apiService($resource, appGlobal) {

        this.query = $resource(appGlobal.apiUrl, getParams(), getQueries());

        ////////

        function getParams() {
            var params = {
                api_key: appGlobal.key,
                format: 'json',
                nojsoncallback: 1,
                user_id: appGlobal.gsfcId
            };
            return params;
        }

        function getQueries() {
            var queries = {
                get: {
                    method: 'GET',
                    url: appGlobal.url,
                    transformResponse: transformResponse
                },
                create: {
                    method: 'PUT',
                    transformRequest: transformRequest
                },
                delete: {
                    method: 'DELETE'
                },
                update: {
                    method: 'POST',
                    transformRequest: transformRequest
                },

                getSearch: {
                    method: 'GET',
                    url: appGlobal.url + appGlobal.method.search,
                    transformResponse: transformResponse
                },
                getTags: {
                    method: 'GET',
                    url: appGlobal.url + appGlobal.method.tags,
                    transformResponse: transformResponse
                }
            };
            return queries;
        }

        ////////

        function transformRequest(params) {
            return JSON.stringify(params);
        }

        function transformResponse(results) {
            return JSON.parse(results);
        }

    }
})();

(function () {

    'use strict';

    angular.module('nasaApp.components')
        .directive('header', headerDirective);

    function headerDirective () {
        var directive =  {
            restrict: 'A',
            replace: true,
            templateUrl: 'templates/header/header.tmpl.html',
            controller: HeaderController,
            controllerAs: 'header'
        };

        return directive;
    }

    HeaderController.$inject = ['_'];

    function HeaderController (_) {

        var header = this;

        _.extend(header, {
            
        });

        function init () {
            
        }

    }
})();

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


(function () {

    'use strict';

    angular.module('nasaApp.components')
        .factory('tagsFactory', tagsFactory);

    tagsFactory.$inject = ['_', 'apiService', 'tagClassService'];

    function tagsFactory(_, apiService, tagClassService) {

        var _handler = {
            _tags: {}
        };

        _.extend(_handler, getMethods());
        Object.defineProperties(_handler, getProperties());

        return _handler;

        ////////

        function getMethods() {
            var methods = {
                getActive: getActive,
                getTags: getTags,
                setTags: setTags
            };
            return methods;
        }

        function getProperties() {
            var properties = {
                tags: {
                    get: function () {
                        return _handler._tags.tags || [];
                    },
                    set: function (tags) {
                        _handler._tags.tags = tags;
                    }
                }
            };
            return properties;
        }

        ////////

        function getActive() {
            var activeTags = [];
            this.tags.forEach(function (tag){
                if (tag.isActive) {
                    activeTags.push(tag._content);
                }
            });
            return activeTags.join(',');
        }

        function getTags(params) {
            params = params || {};
            var promise = apiService.query.getTags(params).$promise;
            return promise.then(setTags.bind(this));
        }

        function setTags(results) {
            var tags = results.who.tags.tag; // wat
            
            this.tagClasses = [];
            tags.forEach(setTag.bind(this));
            this.tagClasses[0].isActive = true;
            this.tags = this.tagClasses;

            delete this.tagClasses;

            return;
        }
        function setTag(tag) {
            var tagClass = new tagClassService(tag);
            this.tagClasses.push(tagClass);
        }

    }

})();
