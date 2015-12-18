angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $rootScope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.new_wish = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.fab_photos = [{
      url: '/img/fabriano/antoniostopponi.jpg',
      author: 'Antonio Stopponi'
  },{
      url: '/img/fabriano/antoniostopponi3.jpg',
      author: 'Antonio Stopponi'
  },{
      url: '/img/fabriano/antoniostopponi2.jpg',
      author: 'Antonio Stopponi'
  },{
      url: '/img/fabriano/fabriziolampini.jpg',
      author: 'Fabrizio Lampini'
  },{
      url: '/img/fabriano/matteomingo.jpg',
      author: 'Matteo Mingo'
  }];

  // Perform the login action when the user submits the login form
  $scope.doAddFabrianoWish = function() {
    console.log('Adding wish...', $scope.new_wish);

    $http.post($rootScope.config.api_wishes, $scope.new_wish)
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            alert("il tuo augurio e' stato aggiunto!");
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("il tuo augurio non e' stato aggiunto, ma siamo ancora in test vai tranquillo!");
        });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {

})

.controller('PlaylistCtrl', function($scope, $stateParams, $rootScope, $sce) {

    $scope.title = null;
    $scope.playlistId = $stateParams.playlistId;
    angular.forEach($rootScope.kinds, function (kind) {
        if (kind.slug == $stateParams.playlistId) {
            $scope.title = kind.title;
        }
    });

    $scope.get_html_preview = function (wish) {

        var embedhtml;
        if (wish.url.indexOf('youtube') !== -1) {
            var youtube_id = wish.url.substr(wish.url.indexOf("?v=")+3);
            var embed_url = "http://www.youtube.com/embed/" + youtube_id + "?autoplay=0";
            embedhtml = '<iframe width="420" height="315" src="';
            embedhtml += embed_url + '"> </iframe>';
            // trust the html content here
        } else if (wish.kind == "wishes_fabriano") {
            embedhtml = '<img src="' + wish.url + '" width="420" height="315" />';
        }
        return $sce.trustAsHtml(embedhtml);
    };
});
