"use strict"

var app = angular.module('PortfolioViewer', []).config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'PortfolioController'})
                .when('/view/:id', {templateUrl: 'partials/view.html', controller: 'ProjectController'})
                .otherwise({redirectTo: '/'})

}])