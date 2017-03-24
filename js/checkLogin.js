infoNews.factory('Authentication', ['$rootScope', '$http', '$location', '$cookies', function($rootScope, $firebaseAuth, $http, $location, $cookies) {


	
	
	
	
	
    return {
        getMessage: function(){
            return $cookies.get('user');
        }
    };
}]);