app.factory('flash', function($rootScope, $timeout) {
  var messages = [],
      reset

  var cleanup = function() {
    $timeout.cancel(reset)

    reset = $timeout(function() { messages = [] })
  }

  var emit = function() {
    $rootScope.$emit('flash:message', messages, cleanup)
  }

  $rootScope.$on('$routeChangeSuccess', emit)

  var as_message = function(level, text) {
    if(! text) {
      text = level
      level = 'success'
    }

    return { level: level, text: text }
  }

  var as_array_of_messages = function(level, text) {
    if(level instanceof Array) return level.map(function(message) {
      return message.text ? message : as_message(message)
    })

    return text ? [{level : level, text: text}] : [as_message(level)]
  }

  return function(level, text) {
    emit(messages = as_array_of_messages(level, text))
  }
})