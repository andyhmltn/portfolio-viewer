"use strict"

var app = angular.module('PortfolioViewer', []).config(['$routeProvider', function($routeProvider) {

  // This sets up the relevent routing
  // settings. Currently there is an index
  // action and a view action
  
  $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'PortfolioController'})
                .when('/view/:id', {templateUrl: 'partials/view.html', controller: 'ProjectController'})
                .otherwise({redirectTo: '/'})

}])