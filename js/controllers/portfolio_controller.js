app.controller("PortfolioController", function($scope, $http) {
  $scope.person = {name: 'Date Picker'}

  $scope.projects = []

  $http({method: 'GET', url: 'api/projects.json'}).success(function(data) {
    $scope.projects = data
  })
})