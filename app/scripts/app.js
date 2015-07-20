app = angular.module('BlocTime', ['ui.router', 'firebase'])

app.config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'timerController',
        templateUrl: "templates/home.html"
      });
  }]);

app.controller('timerController',['$scope', '$interval', function($scope, $interval){

  $scope.timeLeft = 25;  
  $scope.timeStart = function(){
  $scope.disabled = true;
    time = $interval(function(){
      $scope.timeLeft--;
      if($scope.timeLeft === 0){
        $interval.cancel(time);
      }
    }, 1500 );
  }  
  
  $scope.stopTimer = function(){
    $scope.disabled = false;
    $interval.cancel(time);
  }
  $scope.resetTimer = function(){
    $scope.disabled = false;
    $scope.timeLeft = 25;
  }
  
 }]);