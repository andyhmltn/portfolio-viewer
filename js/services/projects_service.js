app.factory('projectsService', function($http) {

  return {
    getProjects: function() {
      return $http.get('http://localhost:3000/projects')
                  .then(function(result) {
                    return result.data
                  })
    }
  }

})