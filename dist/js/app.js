app = angular.module('BlocTime', ['ui.router', 'firebase'])

app.config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: "templates/home.html"
      });
  }]);