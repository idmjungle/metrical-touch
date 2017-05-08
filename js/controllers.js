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
	var mainFolder = "att";
	var subfolder = ["institutional","landline","phone","tablets","video"];
//	var mainFolder = "irsi";
//	var subfolder = ["chilis","ieat","maccaroni","ontheborder","pfchangs"];
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
		
		angular.forEach(subfolder,function(v,k) {
			$http.get("http://174.129.108.63/googleads-php-lib/"+ mainFolder + "/"+ v + "/api.php")
			.then(function(response){
					//console.log(response);
					$scope.theData = response.data;
					console.log($scope.theData);
					var arrayData = $scope.theData;
					newArray(arrayData,v);
			});
		});

	/*$http.get("http://174.129.108.63/googleads-php-lib/irsi/ieat/api.php")
	.then(function(response){
			//console.log(response);
			$scope.ieatData = response.data;
			console.log($scope.ieatData);
			ieat = $scope.ieatData;
			newArray(ieat,"ieat");
	});
		
	$http.get("http://174.129.108.63/googleads-php-lib/irsi/maccaroni/api.php")
	.then(function(response){
			//console.log(response);
			$scope.maccaroniData = response.data;
			console.log($scope.maccaroniData);
			maccaroni = $scope.maccaroniData;
			newArray(maccaroni,"maccaroni");
	});
	
	$http.get("http://174.129.108.63/googleads-php-lib/irsi/ontheborder/api.php")
	.then(function(response){
			//console.log(response);
			$scope.ieatData = response.data;
			console.log($scope.ieatData);
			ontheborder = $scope.ieatData;
			newArray(ontheborder,"ontheborder");
	});
	
	$http.get("http://174.129.108.63/googleads-php-lib/irsi/pfchangs/api.php")
	.then(function(response){
			//console.log(response);
			$scope.pfchangsData = response.data;
			console.log($scope.pfchangsData);
			pfchangs = $scope.pfchangsData;
			newArray(pfchangs,"pfchangs");
	});
	*/
	
		var newArray = function(object,status) {
			viewData = viewData.concat(object);
			console.log(viewData);
			var total = viewData.length;
			console.log(total);
			number++;
			console.log(number);
			if (number === totalFolders) {
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
