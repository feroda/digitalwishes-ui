// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngSanitize', 'slick'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
})
.run(function($rootScope, $http) {

  $rootScope.config = {
      api_wishes: '/api/v1/wishes/'
  };
  $rootScope.config = {
      api_wishes: '/test_data/digitalxmas_api_v1_wishes_.json'
  };

  $rootScope.wishes = [];
  $rootScope.kinds = [{
        title: 'Auguri da Fabriano',
        slug: 'wishes_fabriano'
    }, {
        title: 'Auguri per tutti',
        slug: 'wishes_other'
    }];

    $rootScope.get_media_preview = function (wish) {
        var preview = {
            url: null,
            width: null,
            height: null
        };
        if (wish.url.indexOf('youtube') !== -1) {
            var youtube_id = wish.url.substr(wish.url.indexOf("?v=")+3);
            preview.url = "http://img.youtube.com/vi/" + youtube_id + "/0.jpg";
            // var embed_url = "http://www.youtube.com/embed/" + youtube_id + "?autoplay=0";
            // embedhtml = '<iframe width="420" height="315" src="';
            // embedhtml += embed_url + '"> </iframe>';
        } else if (wish.kind == "wishes_fabriano") {
            preview.url = wish.url;
            preview.width = 420;
            preview.height = 315;
        }
        // trust the html content here
        return preview;
    };

    $http.get($rootScope.config.api_wishes)
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            var wishes = [];
            angular.forEach(response.data, function (wish) {

                wish.preview = $rootScope.get_media_preview(wish);
                wishes.push(wish);
            });
            $rootScope.wishes = wishes;

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
});
