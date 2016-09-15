
angular.module('github-crew', ['ionic', 'github-crew.controllers', 'github-crew.services','ngCordova','ngCordovaOauth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller:'PeopleCtrl'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('auth', {
    url: '/callback',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.people', {
    url: '/people',
    views: {
      'tab-people': {
        templateUrl: 'templates/tab-people.html',
        controller: 'PeopleCtrl'
      }
    }
  })

  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/tab-about.html',
        controller: 'AboutCtrl'
      }
    }
  })
  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'PeopleCtrl'
      }
    }
  })
  .state('tab.profile-detail', {
    url: '/people/:peopleId',
    views: {
      'tab-people': {
        templateUrl: 'templates/profile-detail.html',
        controller: 'ProfileDetailCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/login');

});
