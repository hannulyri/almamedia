'use strict';

angular.module('almamediaApp', ['LocalStorageModule', 'tmh.dynamicLocale',
    'ngResource', 'ui.router', 'ngCookies', 'ngSanitize', 'pascalprecht.translate', 'ngCacheBuster', 'ngFileUpload'])

    .run(function ($rootScope, $location, $window, $http, $state, $translate, Language, ENV, VERSION) {
        $rootScope.individualTitle = undefined;  
        $rootScope.pageNotFound = undefined;
        $rootScope.ENV = ENV;
        $rootScope.VERSION = VERSION;
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;

            // Update the language
            Language.getCurrent().then(function (language) {
                $translate.use(language);
            });
        });


        $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
            var titleKey = 'global.title';

            $rootScope.previousStateName = fromState.name;
            $rootScope.previousStateParams = fromParams;

            // Set the page title key to the one configured in state or use default one
            if (toState.data.pageTitle) {
                titleKey = 'global.' + toState.data.pageTitle;
            }
            if ($rootScope.pageNotFound) {
                titleKey = 'global.pagenotfound.title';
                $rootScope.pageNotFound = undefined;
            }
           $translate([titleKey, 'global.title']).then(function (translations) {
                var title;
                if ($rootScope.individualTitle) {
                    title = $rootScope.individualTitle;
                    $rootScope.individualTitle = undefined; 
                } else {
                    title = translations[Object.keys(translations)[0]];
                }
                var titleTag = translations[Object.keys(translations)[1]];
                $window.document.title = (titleTag !== undefined && title !== titleTag) ? title + " | " + titleTag : title;
            }); 
        });


        $rootScope.back = function() {
            // If previous state is 'activate' or do not exist go to 'home'
            if ($rootScope.previousStateName === 'activate' || $state.get($rootScope.previousStateName) === null) {
                $state.go('home');
            } else {
                $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
            }
        };
    })
    
    .factory('authInterceptor', function ($rootScope, $q, $location, localStorageService) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                var token = localStorageService.get('token');
                
                if (token && token.expires && token.expires > new Date().getTime()) {
                  config.headers['x-auth-token'] = token.token;
                }
                
                return config;
            }
        };
    })
    
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $translateProvider, tmhDynamicLocaleProvider, httpRequestInterceptorCacheBusterProvider) {

        //Cache everything except rest api requests
        httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api.*/, /.*protected.*/], true);

        $urlRouterProvider.otherwise('/');
        $stateProvider.state('site', {
            'abstract': true,
            views: {
                'navbar@': {
                    templateUrl: 'scripts/components/navbar/navbar.html',
                    controller: 'NavbarController'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        });

        $httpProvider.interceptors.push('authInterceptor');

        // Initialize angular-translate
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'i18n/{lang}/{part}.json'
        });

        $translateProvider.preferredLanguage('en');
        $translateProvider.useCookieStorage();

        tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
        tmhDynamicLocaleProvider.useCookieStorage('NG_TRANSLATE_LANG_KEY');
    })
    ;
