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
  	$scope.timeLeft = 1500;

  	$scope.timeStart = function(){
  		$scope.disabled = true;

    	time = $interval(function(){
      		$scope.timeLeft--;
      		if($scope.timeLeft === 0){
        		$interval.cancel(time);
            $scope.breakTime = 300;
      		}
    	}, 1000 );
  	}  
  
  	$scope.stopTimer = function(){
    	$scope.disabled = false;
    	$interval.cancel(time);
  	}
  	$scope.resetTimer = function(){
    	$scope.disabled = false;
    	$scope.timeLeft = 1500;
  	}
  

    $scope.breakStart = function() {
      $scope.breakTime = 300;
      $scope.disabled = true; 

      brk = $interval(function(){
          $scope.breakTime--;
          if($scope.breakTime === 0){
            $interval.cancel(brk);
            $scope.breakTime = undefined;
          }
      }, 1000 );
    }  

    $scope.stopBreak = function(){
      $scope.disabled = false;
      $interval.cancel(brk);
      $scope.breakTime = undefined;
    }

    $scope.resetBreak = function(){
      $scope.disabled = false;
      $scope.timeLeft = 300;
    }
    
    $scope.beginWork = function() {
      $scope.breakTime = undefined; 

    }

    $scope.beginBreak = function() {
      $scope.breakTime = 300;
    }

 }]);

app.filter('convertToCountdown', function() {
	return function(ms) {
		var minutes = parseInt(ms/60, 10); //25
		var seconds = parseInt(ms%60, 10); //0
    
    if (seconds < 10) {
      seconds = '0' + seconds 
    }

		return minutes + ':' + seconds;

	};
});
