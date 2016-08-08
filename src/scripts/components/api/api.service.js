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
