app.controller("PortfolioController", function($scope, $http, $filter) {
  // Your personal information displayed
  // on the portfolio page
  $scope.person = {
    name: 'Date Picker',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, nam, excepturi sequi maiores similique labore placeat necessitatibus repellat soluta voluptatem temporibus beatae ex assumenda eligendi quis possimus recusandae molestiae rem!'
  }


  // Project settings
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

  // Fetch the projects from api/projects.json
  $http({method: 'GET', url: 'api/projects.json'}).success(function(data) {
    $scope.projects = data

    // If there actually is any projects
    // iterate through the fields of the
    // first real one and then add them
    // to $scope.fields for the order-by
    // dropdown
    if($scope.projects.length >= 2)
      for(var field in $scope.projects[1])
        $scope.fields.push(field)

    // Run the search query to build pagination etc
    $scope.search()
  })
  
  // Search Controls

  // This function divides each project
  // up into various arrays for each
  // seperate page
  $scope.group_to_pages = function() {

    $scope.paged_items = []

    for(var i=0; i < $scope.filtered_projects.length; i++) {
      if(i % $scope.per_page === 0)
        $scope.paged_items[Math.floor(i / $scope.per_page)] = [ $scope.filtered_projects[i] ]
      else
        $scope.paged_items[Math.floor(i / $scope.per_page)].push($scope.filtered_projects[i])
    }
  }

  // Apply filters, sort the order
  // of the projects and then
  // run the pagination function
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

    // Reset the current page
    // and sort the results of
    // the filter into pages
    $scope.current_page = 0
    $scope.group_to_pages()
  }

  // Imported from tools.js so it can
  // be used in this scope
  $scope.range     = range;
  $scope.uppercase = uppercase;

  // Pagination Controls

  // Previous page button
  $scope.previous_page = function() {
    if($scope.current_page > 0)
      $scope.current_page--
  }

  // Next page button
  $scope.next_page = function() {
    if($scope.current_page < $scope.paged_items.length - 1)
      $scope.current_page++
  }

  // Numbered Pages
  $scope.set_page = function() {
    $scope.current_page = this.n
  }


})