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
	
	$scope.load = false;

	var viewData = [];
	var fbData = [];
	var mainFolder = "la_familia";
	var subfolder = ["fl","pr"];
//	var mainFolder = "att";
//	var subfolder = ["institutional","landline","phone","tablets","video"];
	var totalFolders = subfolder.length;
	/*
	var chilis;
	var ieat;
	var maccaroni;
	var ontheborder;
	var pfchangs;
	*/
	var number = 0;
	
	$scope.getData = function(viewData,mainFolder,subfolder) {
		console.log(fbData);
		var each = 0;
		//angular.forEach(subfolder,function(v,k) {
		$http({
			url: "https://ohok5h60d0.execute-api.us-east-1.amazonaws.com/prod",
			method: "GET",
			params: {
				"client":"367-027-2784"
			}
		})
		.then(function(response){
			//each++;
			console.log(response);
			$scope.theData = response.data;
			console.log($scope.theData);
			var gaData = $scope.theData;
			gaData.forEach(function(e, i) {
				// Iterate over the keys of object
				Object.keys(e).forEach(function(key) {
				  
				  // Copy the value
				  var val = e[key],
					newKey = key.replace(/\s+/g, '_');
				  
				  // Remove key-value from object
				  delete gaData[i][key];
			  
				  // Add value with new key
				  gaData[i][newKey] = val;
				});
			  });
			//newArray(gaData,v);
			//var gaLength = gaData.length;
			//if (each == totalFolders) {
			$scope.facebook(gaData);
			//}
				
		});
		//});
		
		$scope.addFBPRData = function(firstData) {
			$http({
				url: "https://djr2augmml.execute-api.us-east-1.amazonaws.com/prod",
				method: "GET",
				params: {
					account: "act_1423024001050125"
				}
			})
			.then(function(response){
				console.log(response);
				var secondData = response.data;
				$scope.addFBFLData(firstData,secondData);
			});
			
			
		};
		
		$scope.facebook = function(firstData) {
			$http({
				url: "https://djr2augmml.execute-api.us-east-1.amazonaws.com/prod",
				method: "GET",
				params: {
					account: "act_1579093295443194"
				}
			})
			.then(function(response){
				console.log(response);
				var secondData = response.data;
				$scope.uniteTheData(firstData,secondData);
			});
		};
		
		$scope.uniteTheData = function(firstData,secondData) {
			viewData = firstData.concat(secondData);
			console.log(viewData);
			$scope.viewData = viewData;
			$scope.load = true;
		};
		
		var newArray = function(object,status) {
			viewData = viewData.concat(object);
			console.log(viewData);
			var total = object.length;
			console.log(total);
			number++;
			console.log(number);
			if (number === totalFolders) {
				$scope.viewData = viewData;
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

			//$scope.viewData = newObject;

		};
	};
	
	$scope.getData(viewData,mainFolder,subfolder);
	
	$interval(function(){
		$scope.getData(viewData,mainFolder,subfolder);
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
