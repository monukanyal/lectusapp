define('sampleapp/appui/datasources/tmdb', [
    'antie/class',
    'antie/runtimecontext',
    'sampleapp/appui/config/app.config'
], function (
    Class,
    RuntimeContext,
    appConfig
) {
    'use strict';
    /**
     * Creates a proper url for The Movie Database
     */
    var buildUrl = function () {
        var tmdb = appConfig && appConfig.tmdb || {},
            api = tmdb && tmdb.api || {},
            url, domain, discover, apiKey, filters, i;

            domain = api.domain;
            discover = api.discover;
            apiKey = tmdb.apiKey;
            filters = api.filters;

            if (!domain || !apiKey || filters.length === 0) {
                return 'errorUrl';
            }
        
            url = domain + discover + '?api_key=' + apiKey;

            for(i = 0; i < filters.length; i ++) {
                url += '&' + filters[i];
            }

            return url;
    }

    return Class.extend({

        loadData: function (cb) {
            var device = RuntimeContext.getDevice(),
                url = buildUrl();
                // url = "http://182.71.167.76:8098/api/appmovies/genre/drama";


            device.loadURL(url, {
                onLoad: function (response){
                    document.getElementById('loader').style.display = 'none';
                    cb.onSuccess(JSON.parse(response).results);
                },
                onError: cb.onError
            });

            // device.loadUrl(url, {
            //   method: 'GET',
            //   headers: {
            //     'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW5tb2xzYWluaSIsImlzQWRtaW4iOnRydWUsInBhc3N3b3JkIjoiYWRtaW4iLCJmdWxsTmFtZSI6IkFubW9sICIsIl9pZCI6Ilc4TkE0cmRBblRjMElwZ0oiLCJwaG9uZU51bWJlciI6Ijc5MDAwMDAwMzU2IiwiZW1haWxJZCI6ImFubW9sc2FpbmlAZ21haWwuY29tIiwibG9nZ2VkSW5EZXZpY2UiOjEsInVkSWQiOiI0NTEycGtsbW4iLCJmaWxlUGF0aCI6Imh0dHA6Ly8xODIuNzEuMTY3Ljc2OjgwOTgvZGlyMi91cGxvYWRzL3Byb2ZpbGVQaG90by0xNTE0MjY4MjkxNzUxLXByb2ZpbGVQaG90byIsImlhdCI6MTUxNDI4MTgxNX0.AVZ4guspcoED4hzv7zteEbBmUjl6zNONoKiwZ2nc6UI'
            //   },
            //   onLoad: function (response){
            //         document.getElementById('loader').style.display = 'none';
            //         cb.onSuccess(JSON.parse(response).results);
            //     },
            //     onError: cb.onError
            // });
        }
    })
});
    
