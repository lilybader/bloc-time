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
    var time;
    var workingTime = 1500;
    var shortBreak = 300;
    var longBreak = 1800;

    // var workingTime = 2;
    // var shortBreak = 3;
    // var longBreak = 4;
    var breakTime;

    $scope.timeLeft = workingTime;  
    $scope.numberOfBreaks = 0;

    var setBreakLength = function () {
      if (($scope.numberOfBreaks % 4) === 0) {
        $scope.timeLeft = longBreak;
      } else {
        $scope.timeLeft = shortBreak;
      }
    };

    var startBreak = function() {
      if (!breakTime) {
        $scope.numberOfBreaks += 1;
        breakTime = true;
        setBreakLength();
      } else {
        breakTime = false;
        $scope.resetTimer();
      }
    };

  	$scope.timerStart = function(){
      $scope.stopTimer();
      $scope.disabled = true;

    	time = $interval(function(){
    		$scope.timeLeft--;
    		if($scope.timeLeft === 0){
          $scope.disabled = false;
      		$interval.cancel(time);
          startBreak();
        }
    	}, 1000 );
  	}; 
  
  	$scope.stopTimer = function(){
      if (time) {
      	$scope.disabled = false;
      	$interval.cancel(time);
      }
  	};

  	$scope.resetTimer = function() {
      $scope.stopTimer();
    	$scope.disabled = false;
    	$scope.timeLeft = workingTime; 
  	};

    $scope.setTimeLimit = function(timeLimit) {
      $scope.timeLeft = timeLimit;
      $scope.timerStart();
    };
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
