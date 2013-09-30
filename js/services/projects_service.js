app.factory('projectsService', function($http) {

  return {
    getProjects: function() {
      return $http.get('http://localhost:3000/projects')
                  .then(function(result) {
                    return result.data
                  })
    },

    getProject: function(id) {
      return $http.get('http://localhost:3000/projects/'+id)
                  .then(function(result) {
                    return result.data
                  })
    },

    deleteProject: function(id) {
      return $http.delete('http://localhost:3000/projects/'+id)
                  .then(function(result) {
                    return result.data
                  })
    }
  }

})