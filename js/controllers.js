app.controller('IntroController',['$scope', '$rootScope', '$http', '$cookies', '$location', '$timeout', function($scope, $rootScope, $http, $cookies, $location, $timeout) {
	
	$scope.animation = "logo_start";
	
	$timeout(function(){
		$scope.introAnimation();
	},200);
	
	
	$scope.introAnimation = function(){
		$scope.animation = "";
		$timeout(function(){
			$location.path('/main');
		},2500);
	};
	
	
					
}]);

app.controller('MainController',['$scope', '$rootScope', '$http', '$cookies', '$location', '$timeout', function($scope, $rootScope, $http, $cookies, $location, $timeout) {
	$http.get("data/example.json")
	.then(function(response){
		console.log(response);
		$scope.viewData = response.data;
		console.log($scope.viewData);
		$scope.pageviews = $scope.viewData.rows[0][0];
		$scope.totalEvents = $scope.viewData.rows[0][1];
		$scope.socialInteractions = $scope.viewData.rows[0][2];
	});

	
	
}]);


function doneLoading() {
	
	
}
