//'use strict';

/*Controllers*/

angular.module('surveyApp.controllers', [])
.controller('MainController', function($scope, $http, userInfo){

})
.controller('NavbarController', function($scope, $location){
	console.log($location.path());

//	console.log(userInfo.getUsername());
	//Mark navbar active
	//Source: http://stackoverflow.com/questions/16199418/how-do-i-implement-the-bootstrap-navbar-active-class-with-angular-js
	$scope.currentPage = function(viewLocation){
		return viewLocation === $location.path();
	};
})
.controller('UserinfoController', function($scope, $http, userInfo2){
//	surveyApp.controller('UserinfoController', function($scope, $http){
	$scope.ButtonClick = function(){
//		alert(userInfo.getFirstname());
	};

	var ala;
	userInfo2.get(function(something){
		$scope.firstname = something.name;
		$scope.username = something.userCredentials.username;
	}, function(err){
		$scope.username = "Not logged in";
	});
	$scope.show = true;

//	console.log(ala);

	//$scope.firstname = data.name;
	//console.log(ala);
/*	$scope.username = userInfo.getUsername();
	$scope.firstname = userInfo.getFirstname();
	$scope.lastname = userInfo.getLastname();*/

/*
	$scope.$watch('userInfo.getLoggedIn()', function (newdata){
		console.log(newdata);
		$scope.show=true;
	});*/

})
.controller('ProgramController', ['$scope', '$http', 'urlInfo', 'programsInfo', function($scope,$http, urlInfo, programsInfo){
	console.log(programsInfo.data());
	//$scope.programs = [];
	var url;
	var data;
	//console.log(url);
	$scope.programs = [];
	$scope.subPrograms = [];
	PopulatePrograms();

	function PopulatePrograms(){
		if(urlInfo == "localhost"){
			url = 'api/programs.json';
		}
		else{
			url = urlInfo + '/api/programs.json';
		}
		$http.get(url)
		.success(function(response){
			angular.forEach(response.programs, function(value, key){

				if(value.kind == 'SINGLE_EVENT_WITHOUT_REGISTRATION'){
					$scope.programs.push(value);
					//PopulateSubPrograms();
				}
			});
			PopulateSubPrograms();
		})
		.error(function(response, status){
			console.log(response + status);
			console.log("it dosnt work with jsonp.");
		});
	}

	function PopulateSubPrograms(){
		console.log($scope.programs[0]);

		angular.forEach($scope.programs, function (value,key){
			if(urlInfo == "localhost"){
				url = 'api/programs/' + value.id + '.json';
			}
			else{
				url = value.href + '.json';
			}
			$http.get(url)
			.success(function(response){
				console.log(response);

			})
			.error(function(response, status){
				console.log(response + status);
				console.log("it dosnt work with jsonp.");
			});
		});

	}

//	function 

/*Parse data or return data? */



}]);