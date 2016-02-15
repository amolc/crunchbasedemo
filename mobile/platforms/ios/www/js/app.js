
angular.module('starter', ['ionic' ,'ngCordova','starter.controllers','ngSanitize','MassAutoComplete'])

.run(function($ionicPlatform,$cordovaDevice) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

      ionic.Platform.ready(function(){
    
    });

  });
    
})

.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider) {
  $stateProvider

  .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller:'crunchbaseController'
  })

  .state('detailpage', {
      url: '/detailpage',
      templateUrl: 'templates/details_page.html',
      controller:'crunchbaseController'
  });

  $urlRouterProvider.otherwise('home');

  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://api.crunchbase.com/**'
  ]);

})


