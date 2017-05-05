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
	
	var viewData = [];
	var institutional;
	var phone;
	var number = 0;
	
	$scope.getData = function() {
		
	$http.get("http://174.129.108.63/googleads-php-lib/irsi/chilis/api.php")
	.then(function(response){
			//console.log(response);
			$scope.institutionalData = response.data;
			console.log($scope.institutionalData);
			institutional = $scope.institutionalData;
			newArray(institutional,"institutional");
	});

	$http.get("http://174.129.108.63/googleads-php-lib/irsi/ieat/api.php")
	.then(function(response){
			//console.log(response);
			$scope.phoneData = response.data;
			console.log($scope.phoneData);
			phone = $scope.phoneData;
			newArray(phone,"phone");
	});
		
	$http.get("http://174.129.108.63/googleads-php-lib/irsi/maccaroni/api.php")
	.then(function(response){
			//console.log(response);
			$scope.videoData = response.data;
			console.log($scope.videoData);
			video = $scope.videoData;
			newArray(video,"video");
	});
	
	$http.get("http://174.129.108.63/googleads-php-lib/irsi/ontheborder/api.php")
	.then(function(response){
			//console.log(response);
			$scope.tabletsData = response.data;
			console.log($scope.tabletsData);
			tablets = $scope.tabletsData;
			newArray(tablets,"tablets");
	});
	
	$http.get("http://174.129.108.63/googleads-php-lib/irsi/pfchangs/api.php")
	.then(function(response){
			//console.log(response);
			$scope.landlineData = response.data;
			console.log($scope.landlineData);
			landline = $scope.landlineData;
			newArray(landline,"landline");
	});
	
	
	var newArray = function(object,status) {
		viewData = viewData.concat(object);
		console.log(viewData);
		var total = viewData.length;
		console.log(total);
		number++;
		console.log(number);
		if (status === "landline") {
			fixArray(viewData);
		}
		
	};
	
	var fixArray = function(object) {
		var newObject = [];
		console.log(object);
		angular.forEach(object,function(v,k) {
			if (v.Campaign_ID !== "Total") {
				//alert("Total");
				console.log(k);
				newObject.push(v);
				console.log(newObject);
			}
		});
		
		$scope.viewData = newObject;

	};
		
		
		
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
