app.controller('mainController',['$scope', '$http', '$sce', function($scope, $http, $sce){

$scope.$sce = $sce

var getVideoData = function(){
	return $http.get("http://localhost:3000/videoData")
}

var assignData = function(response){
	$scope.videoData = response.data
}

getVideoData().then(assignData)


}])