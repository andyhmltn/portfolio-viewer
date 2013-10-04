app.factory('projectsService', function($http) {

  var url = 'http://localhost:3000/projects/'

  return {
    getProjects: function() {
      return $http.get(url)
                  .then(function(result) {
                    return result.data
                  })
    },

    getProject: function(id) {
      return $http.get(url+id)
                  .then(function(result) {
                    return result.data
                  })
    },

    deleteProject: function(id) {
      return $http.delete(url+id)
                  .then(function(result) {
                    return result.data
                  })
    }
  }

})