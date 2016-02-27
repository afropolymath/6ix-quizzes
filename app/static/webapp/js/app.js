(function () {

  'use strict';

  require('angular');
  require('angular-ui-router');
  require('angular-animate');
  require('angular-toastr');
  require('angular-localforage');

  var mainCtrl = require('./controllers/mainctrl');
  var dashboardCtrl = require('./controllers/dashboardctrl');
  var activityCtrl = require('./controllers/activityctrl');
  var directoryCtrl = require('./controllers/directoryctrl');

  // var userFactory = require('./services/user');

  angular.module('SixApp', ['ui.router', 'ngAnimate'])

  .config([
    '$urlRouterProvider',
    '$stateProvider',
    '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider) {
      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise("/");
      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: './static/dist/views/main.html',
          controller: 'MainController'
        })
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: './static/dist/views/dashboard.html',
          controller: function($scope, $state) {
            if($state.current.name == 'dashboard')
              $state.go('dashboard.home');
          }
        })
        .state('dashboard.home', {
          url: '/home',
          templateUrl: './static/dist/views/dashboard/home.html',
          controller: 'DashboardController'
        })
        .state('dashboard.activity', {
          url: '/activity',
          templateUrl: './static/dist/views/dashboard/activity.html',
          controller: 'ActivityController'
        })
        .state('dashboard.settings', {
          url: '/settings',
          templateUrl: './static/dist/views/dashboard/settings.html',
          controller: 'ActivityController'
        })
        .state('directory', {
          url: '/directory',
          templateUrl: './static/dist/views/directory.html',
          controller: 'DirectoryController'
        })
        .state('single', {
          url: '/test/:id',
          templateUrl: './static/dist/views/test/view.html'
        })
        .state('editor', {
          url: '/test/:id/editor',
          templateUrl: './static/dist/views/test/editor.html'
        })
    }
  ])

  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
      // Validation logic
    });
    $rootScope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams){
      $('.ui.dropdown').dropdown();
    });
  }])

  //Load Factories
  // .factory('User', ['$http', userFactory])

  // Load Controllers
  .controller('MainController', ['$scope', mainCtrl])
  .controller('DashboardController', ['$scope', dashboardCtrl])
  .controller('ActivityController', ['$scope', activityCtrl])
  .controller('DirectoryController', ['$scope', directoryCtrl])

})()
