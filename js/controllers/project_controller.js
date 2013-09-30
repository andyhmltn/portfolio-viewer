"use strict"

app.controller("ProjectController", function($scope, $routeParams, $http, projectsService) {
  $scope.id      = $routeParams.id
  $scope.project = {}
  $scope.found   = false

  projectsService.getProject($scope.id).then(function(data) {
    if(data.length === 0)
      $scope.found = false
    else {
      $scope.project = data
      $scope.found   = true
    }
  })
});