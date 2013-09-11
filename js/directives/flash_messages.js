app.directive('flashMessages', function() {
  var directive = { restrict: 'E', replace: true }

  directive.template = [
   '<div ng-repeat="m in messages" id="flash-messages">'
  ,      '<div class="alert {{m.level}}">'
  ,          '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
  ,          '<strong>Please Note</strong> {{m.text}}'
  ,      '</div>'
  ,  '</div>'].join('\n')

  directive.controller = function($scope, $rootScope) {
    $rootScope.$on('flash:message', function(_, messages, done) {
      $scope.messages = messages
      done()
    })
  }

  return directive
})