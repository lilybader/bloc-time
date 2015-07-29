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

app.controller('timerController',['$scope', '$interval', '$firebase' function($scope, $interval, $firebase){
    var ref = new Firebase('https://bloc-time.firebaseio.com/time');
    var track = $firebase(ref);

    $scope.timeLeft = 120; //change back to 1500 after tests 

  	$scope.timeStart = function(){
  		$scope.disabled = true;

// Do I need to change the state everytime it finishes?
    	time = $interval(function(){
      		$scope.timeLeft--;
      		if($scope.timeLeft === 0){
        		$interval.cancel(time);
            $scope.breakTime = 300;
            // var times = times.$getRecord(timeId);
            // time.state = "complete";
            // times.$save(time);
      		}
    	}, 1000 );
      // if statement?

  	}  
  
  	$scope.stopTimer = function(){
    	$scope.disabled = false;
    	$interval.cancel(time);
  	}
  	$scope.resetTimer = function(){
    	$scope.disabled = false;
    	$scope.timeLeft = 120; //change back to 1500 after tests
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

    // $scope.completeWork = function(){
    //   $scope.longBreak = function(){
    //     $scope.longTime = 1800;
    //     $scope.disabled = true;

    //     longBrk = $interval(function(){
    //       $scope.longTime--;
    //       if($scope.longTime === 0){
    //         $interval.cancel(longBrk);
    //         $scope.longTime = undefined;
    //       }
    //   }, 1000 );

    // $scope.stopLongBreak = function(){
    //   $scope.disabled = false;
    //   $interval.cancel(longBrk);
    //   $scope.longTime = undefined;
    // }

    // $scope.resetLongBreak = function(){
    //   $scope.disabled = false;
    //   $scope.timeLeft = 300;
    // }
    //   }

      // if (i === 4) 
      //   return $scope.completeWork; 
    
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
