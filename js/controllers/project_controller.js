app.controller("ProjectController", function($scope, $routeParams, $http) {
  $scope.id      = $routeParams.id
  $scope.project = {}
  $scope.found   = false
  $http({method: 'GET', url: 'http://localhost:3000/projects/'+$scope.id}).success(function(data) {

    if(data.length === 0)
      $scope.found = false
    else {
      $scope.project = data
      $scope.found   = true
    }
  })
});