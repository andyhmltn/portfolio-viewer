var search_match = function (haystack, needle) {
    if (!needle) return true

    if(typeof haystack !== 'string') {
      if(typeof haystack === 'object') {
        var found = false;

        for(var item in haystack)
          if(haystack[item].toLowerCase().indexOf(needle.toLowerCase()) !== -1)
            found = true;

        return found

      } else return false;
    }
    
    return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1
}

var range = function (start, end) {
    var ret = []
    if (!end) {
        end = start
        start = 0
    }
    for (var i = start; i < end; i++) {
        ret.push(i)
    }
    return ret
}