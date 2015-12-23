// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngSanitize', 'slick', 'ngDropdowns'])

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
          templateUrl: 'templates/browse.html',
          controller: 'BrowseCtrl'
        }
      }
    })

  .state('app.detail', {
    url: '/wish/:wish_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/detail.html',
        controller: 'DetailCtrl'
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
.run(function($rootScope, $http, $state) {

  $rootScope.$state = $state;
  $rootScope.config = {
      api_wishes: '/api/v1/wishes/',
      base_url: 'http://app.fabrianodigital.it/ui/'
  };

  $rootScope.config = {
     api_wishes: '/test_data/digitalxmas_api_v1_wishes_.json',
     base_url: 'http://localhost:8100/'
  };

  $rootScope.wishes = [];
  $rootScope.kinds = [{
        text: 'Tutti gli auguri',
        value: null
    }, {
        text: 'Cartoline da Fabriano',
        value: 'wishes_fabriano'
    }, {
        text: 'Altri auguri',
        value: 'wishes_other'
    }];

    $rootScope.get_media_preview = function (wish) {
        var preview = {
            url: wish.url,
            width: null,
            height: null,
            kind: 'url'
        };
        if ((wish.url.indexOf('youtube') !== -1)||(wish.url.indexOf('youtu.be') !== -1)) {
            var youtube_id = wish.url.substr(wish.url.indexOf("?v=")+3);
            preview.url = "http://img.youtube.com/vi/" + youtube_id + "/0.jpg";
            preview.kind = 'video';
        } else if ((wish.url.indexOf('facebook') !== -1) && (wish.url.indexOf('video') !== -1)) {
            var facebook_id = wish.url.substr(wish.url.indexOf("videos/")+7);
            preview.url = "http://graph.facebook.com/" + facebook_id + "picture?type=large";
            preview.kind = 'video';
        } else {
            preview.url = wish.url;
            preview.width = 420;
            preview.height = 315;
            preview.kind = 'img';
        }
        return preview;
    };

    $rootScope.get_wishes_randomized = function () {
        //THIS IS NEEDED TO AVOID the nginfdig error
        //http://stackoverflow.com/questions/20963462/rootscopeinfdig-error-caused-by-filter
        //https://docs.angularjs.org/error/$rootScope/infdig?p0=10&p1=[[{%22msg%22:%22fn:%20regularInterceptedExpression%22,%22newVal%22:272,%22oldVal%22:271},{%22msg%22:%22fn:%20regularInterceptedExpression%22,%22newVal%22:%22We%20are%20happy%20from%20Fabriano%20Part%202%22},{%22msg%22:%22fn:%20regularInterceptedExpression%22,%22newVal%22:%224%22},{%22msg%22:%22!wish.preview.width%22,%22newVal%22:true},{%22msg%22:%22wish.preview.width%22,%22newVal%22:null},{%22msg%22:%22fn:%20regularInterceptedExpression%22,%22newVal%22:%22%22},{%22msg%22:%22fn:%20regularInterceptedExpression%22,%22newVal%22:%22%22},{%22msg%22:%22fn:%20regularInterceptedExpression%22,%22newVal%22:%22%22},{%22msg%22:%22fn:%20regularInterceptedExpression%22,%22newVal%22:%22%28...nessuna%20dedica%20inserita...%29%22},{%22msg%22:%22fn:%20regularInterceptedExpression%22,%22newVal%22:%22http:%2F%2Fimg.youtube.com%2Fvi%2FeMFsnEqybO8%2F0.jpg%22}],[{%22msg%22:%22fn:%20regularInterceptedExpression%22,%22newVal%22:274,%22oldVal%22:272}],[{%22msg%22:%22fn:%20regularInterceptedExpression%22,%22newVal%22:277,%22oldVal%22:274}],[{%22msg%22:%22fn:%20regularInterceptedExpression%22,%22newVal%22:279,%22oldVal%22:277}],[{%22msg%22:%22fn:%20regularInterceptedExpression%22,%22newVal%22:283,%22oldVal%22:279}]]
        var w = [];
        var prev_el = null;
        angular.forEach($rootScope.wishes, function (el) {
            if (!prev_el) {
                prev_el = el;
            } else {
                var rand = 0.5 - Math.random();
                if (rand >= 0) {
                    w.push(el);
                } else {
                    w.push(prev_el);
                    prev_el = el;
                }
            }
        });
        w.push(prev_el);
        return w;
    };

    $rootScope.play = function (wish, width, height) {

        var html;
        if (width) {
            width = ' width="'+width+'" ';
        } else {
            width = '';
        }
        if (height) {
            height = ' height="'+height+'" ';
        } else {
            height = '';
        }

        if (wish.kind == "wishes_fabriano") {
            return false; //TODO
            html = '<img src="' + wish.url + '" width="420" height="315" />';
        } else if ((wish.url.indexOf('youtube') !== -1)||(wish.url.indexOf('youtu.be') !== -1)) {
            // YouTube Video
            var youtube_id = wish.url.substr(wish.url.indexOf("?v=")+3);
            embed_url = "http://www.youtube.com/embed/" + youtube_id + "?autoplay=1&showinfo=0";
            html = '<iframe src="' + embed_url + '" ';
            html += width + height + '> </iframe>';
            // trust the html content here
        }
        else if ((wish.url.indexOf('facebook.com') !== -1) && (wish.url.indexOf('videos/') !== -1)) {
            // Facebook Video
            var facebook_id = wish.url.substr(wish.url.indexOf("videos/")+7);
            embed_url = "https://www.facebook.com/video/embed?video_id=" + facebook_id;
            html = '<iframe src="'+embed_url+'" class="wish-thumbnail" ';
            html += width + height + '> </iframe>';
        }

        document.getElementById('wish-'+wish.id).innerHTML = html;
    };

    $rootScope.get_wishes = function(cb) {

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
                $rootScope.wishes_random = $rootScope.get_wishes_randomized();

                if (cb) { cb(); }

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };

    $rootScope.get_wishes();
});
