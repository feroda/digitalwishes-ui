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
  $scope.addWish = function(kind_humanized, src, preview_url) {
    $scope.kind_humanized = kind_humanized;
    $scope.new_wish.url = src;
    $scope.new_wish.preview_url = preview_url;
    $scope.modal.show();
  };

  $scope.fab_photos = [{
      url: $rootScope.config.base_url + 'img/fabriano/antoniostopponi.jpg',
      author: 'Antonio Stopponi'
  },{
      url: $rootScope.config.base_url + 'img/fabriano/antoniostopponi3.jpg',
      author: 'Antonio Stopponi'
  },{
      url: $rootScope.config.base_url + 'img/fabriano/antoniostopponi2.jpg',
      author: 'Antonio Stopponi'
  },{
      url: $rootScope.config.base_url + 'img/fabriano/fabriziolampini.jpg',
      author: 'Fabrizio Lampini'
  },{
      url: $rootScope.config.base_url + 'img/fabriano/matteomingo.jpg',
      author: 'Matteo Mingo'
  }];
  angular.forEach($scope.fab_photos, function (photo) {
      photo.preview = $rootScope.get_media_preview(photo);
  });

  // Perform the login action when the user submits the login form
  $scope.doAddFabrianoWish = function() {
    console.log('Adding wish...', $scope.new_wish);

    $http.post($rootScope.config.api_wishes, $scope.new_wish)
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            alert("il tuo augurio e' stato aggiunto! Prima di essere visualizzato dovrà essere approvato dallo staff.");
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

.controller('PlaylistsCtrl', function($scope, $rootScope) {

})

.controller('BrowseCtrl', function($scope, $rootScope) {

    $scope.update_random = function() {
        $rootScope.wishes = $rootScope.wishes_random;
        $rootScope.wishes_random = $rootScope.get_wishes_randomized();
    };

    $scope.kind_selected = { text: 'Scegli gli auguri', value: null };
    $scope.comp_category = function (actual, expected) {
        if (!expected || actual == expected) {
            return true;
        }
    };

})

.controller('PlaylistCtrl', function($scope, $stateParams, $rootScope, $sce) {

    $scope.title = null;
    $scope.playlistId = $stateParams.playlistId;
    angular.forEach($rootScope.kinds, function (kind) {
        if (kind.slug == $stateParams.playlistId) {
            $scope.title = kind.title;
        }
    });

});
