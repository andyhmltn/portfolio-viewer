app.controller("ProjectController", function($scope, $routeParams, $http) {
  $scope.id      = $routeParams.id
  $scope.project = {}
  $scope.found   = false

  $http({method: 'GET', url: 'api/projects.json'}).success(function(data) {
    for(var key in data) {
      if(data[key].id == $scope.id) {
        $scope.project = data[key]
        $scope.found   = true
      }
    }
  })
});