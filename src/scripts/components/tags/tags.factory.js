
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
