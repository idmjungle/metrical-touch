ultraEdit.factory('Authentication', ['$rootScope', '$firebaseAuth', '$http', '$location', function($rootScope, $firebaseAuth, $http, $location) {
	
	var auth = $firebaseAuth();
	
	auth.$onAuthStateChanged(function(authUser) {
		if (authUser)  {
			var data = $.param({
				email: authUser.email,
				form_type: "login"
			});
			
			$http({
				url: 'include/functions.php',
				method: "POST",
				data: data ,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function (data) {
					console.log(data);
					$rootScope.currentUser = data;
					if ($location.path() === '/login') {
						$location.path('/dashboard');
					}
				});
		} else {
			$rootScope.currentUser = '';
			
		}
	});
	
	return {
		login: function(user) {
			auth.$signInWithEmailAndPassword(user.email,user.password)
			.then(function(regUser) {
				
				
				$location.path('/dashboard');
			}).catch(function(error) {
				$rootScope.message = error.message;
			});
			$rootScope.message = "Welcome " + user.email;	
		},
		logout: function() {
			return auth.$signOut();
		},
		requireAuth: function() {
			return auth.$requireSignIn();
			
		},
		register: function(user) {
			auth.$createUserWithEmailAndPassword(user.email,user.password
			).then(function(regUser) {
				var data = $.param({
					email: user.email,
					name: user.name,
					form_type: "register"
				});
				
				$http({
					url: 'include/functions.php',
					method: "POST",
					data: data ,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function (data, status, headers, config) {
						console.log(data);
					}).error(function (data, status, headers, config) {});
				
				$rootScope.message = "Hi " + user.name;
			}).catch(function(error) {
				$rootScope.message = error.message;
			});
			
		}
		
	};
	
}]);


	
	
	
		
		
/*		var data = $.param({
			email: $scope.user.email,
			name: $scope.user.name,
			form_type: "register"
		});
		
		$http({
			url: 'include/functions.php',
			method: "POST",
			data: data ,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function (data, status, headers, config) {
				console.log(data);
			}).error(function (data, status, headers, config) {});
*/			
