app.controller("PortfolioController", function($scope, $http) {
  $scope.person = {name: 'Date Picker'}
  $scope.projects = []

  // Pagination settings
  $scope.per_page     = 3
  $scope.current_page = 0
  $scope.paged_items  = []

  $http({method: 'GET', url: 'api/projects.json'}).success(function(data) {
    $scope.projects = data
    $scope.group_to_pages()

    console.log($scope.projects.length)
  })

  $scope.group_to_pages = function() {

    $scope.paged_items = []

    for(var i=0; i < $scope.projects.length; i++) {
      if(i % $scope.per_page === 0)
        $scope.paged_items[Math.floor(i / $scope.per_page)] = [ $scope.projects[i] ]
      else
        $scope.paged_items[Math.floor(i / $scope.per_page)].push($scope.projects[i])
    }
  }


  $scope.previous_page = function() {
    if($scope.current_page > 0)
      $scope.current_page--

    console.log($scope.current_page)
  }

  $scope.next_page = function() {
    if($scope.current_page < $scope.paged_items.length - 1)
      $scope.current_page++

    console.log($scope.current_page)
  }

  $scope.set_page = function() {
    $scope.current_page = this.n
  }

  $scope.range = function (start, end) {
      var ret = [];
      if (!end) {
          end = start;
          start = 0;
      }
      for (var i = start; i < end; i++) {
          ret.push(i);
      }
      return ret;
  };
})