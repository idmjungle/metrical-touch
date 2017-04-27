app.controller('IntroController',['$scope', '$rootScope', '$http', '$cookies', '$location', '$timeout', function($scope, $rootScope, $http, $cookies, $location, $timeout) {
	
	$scope.animation = "logo_start";
	
	$timeout(function(){
		$scope.introAnimation();
	},200);
	
	
	$scope.introAnimation = function(){
		$scope.animation = "";
		$timeout(function(){
			$scope.animation = "logo_transition";
		},500);
		$timeout(function(){
			$scope.animation = "logo_end";
			$location.path('/main');
		},2500);
	};
	
	
					
}]);

app.controller('MainController',['$scope', '$rootScope', '$http', '$cookies', '$location', '$timeout', '$interval', function($scope, $rootScope, $http, $cookies, $location, $timeout, $interval) {
	
	$scope.getData = function(){
		$http.get("http://174.129.108.63/googleads-php-lib/att/api.php")
		.then(function(response){
			if(response.status = 200) {
				console.log(response);
				$scope.viewData = response.data;
				//console.log($scope.viewData);
			} else {
				
			}
		});
	};
	
	
	$scope.getData();
	
	$interval(function(){
		$scope.getData();
	},300000);
	
	$interval(function(){
		$scope.animateBG();
	},60000);
	
	$interval(function(){
		$scope.rotateLogo();
	},20000);
	
	$scope.animateBG = function(){
		$scope.changeBG = "flip";
		$timeout(function(){
			$scope.changeBG = "";
		},5000);
	};
	
	$scope.rotateLogo = function(){
		$scope.zoomInterval = "";
		$timeout(function(){
			$scope.zoomInterval = "transform";
		},5000);
		$timeout(function(){
			$scope.zoomInterval = "";
		},10000);
	};

	
}]);


function doneLoading() {
	
	
}
