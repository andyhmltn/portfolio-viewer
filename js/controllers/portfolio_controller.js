app.controller("PortfolioController", function($scope, $http, $filter) {
  $scope.person = {
    name: 'Date Picker',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, nam, excepturi sequi maiores similique labore placeat necessitatibus repellat soluta voluptatem temporibus beatae ex assumenda eligendi quis possimus recusandae molestiae rem!'
  }

  $scope.projects = []
  $scope.filtered_projects = []

  // Pagination settings
  $scope.per_page      = 3
  $scope.current_page  = 0
  $scope.found_results = 0
  $scope.paged_items   = []
  $scope.fields        = []

  // Sort by settings
  $scope.sorting_order = 'title' // Default to title
  $scope.reverse       = false

  $http({method: 'GET', url: 'api/projects.json'}).success(function(data) {
    $scope.projects = data

    if($scope.projects.length >= 2)
      for(var field in $scope.projects[1])
        $scope.fields.push(field)

    $scope.search()
  })

  // Sort By Controls
  $scope.sort_by = function(new_sorting_order) {
    $scope.sorting_order = new_sorting_order;
  }
  
  // Search Controls
  $scope.group_to_pages = function() {

    $scope.paged_items = []

    for(var i=0; i < $scope.filtered_projects.length; i++) {
      if(i % $scope.per_page === 0)
        $scope.paged_items[Math.floor(i / $scope.per_page)] = [ $scope.filtered_projects[i] ]
      else
        $scope.paged_items[Math.floor(i / $scope.per_page)].push($scope.filtered_projects[i])
    }
  }

  $scope.search = function () {
    $scope.found_results = 0
    
    $scope.filtered_projects = $filter('filter')($scope.projects, function (item) {
        for(var attr in item) {
            if (search_match(item[attr], $scope.query)) {
              $scope.found_results += 1
              return true
            }
        }
        return false
    })

    if ($scope.sorting_order !== '') {
      $scope.filtered_projects = $filter('orderBy')($scope.filtered_projects, $scope.sorting_order, $scope.reverse);
    }

    $scope.current_page = 0
    $scope.group_to_pages()
  }

  $scope.range = range;

  // Pagination Controls
  $scope.previous_page = function() {
    if($scope.current_page > 0)
      $scope.current_page--
  }

  $scope.next_page = function() {
    if($scope.current_page < $scope.paged_items.length - 1)
      $scope.current_page++
  }

  $scope.set_page = function() {
    $scope.current_page = this.n
  }

  $scope.uppercase = uppercase;

})