var express = require('express')
  , mongoskin = require('mongoskin')

var app = express()
app.use(express.bodyParser())

var db = mongoskin.db('localhost:27017/test', {safe:true});

var collection_middleware = function(req, res, next) {
  
  req.collection = db.collection('projects')
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","GET,PUT,DELETE")

  return next()
} 

app.use(collection_middleware)

app.get('/projects', function(req, res, next) {
  req.collection.find({}, {sort: [['_id',-1]]}).toArray(function(e, results) {
    if (e) {
      return res.send(require('./projects'));
    }

    res.send(results)
  })
})

app.get('/projects/:id', function(req, res, next) {
  req.collection.findOne({_id: req.collection.id(req.params.id)}, function(e, results) {
    if(e) {
      var json_results = require('./projects')

      var found = false;

      for(var i=0; i<json_results.length; i++) {
        if(json_results[i]._id == req.params.id) {
          found = true

          return res.send(json_results[i])
        }
      }

      if(! found) return next(e)
    }

    res.send(results)
  })
})

app.del('/projects/:id', function(req, res, next) {
  console.log('deleting', req.params.id);

  req.collection.remove({_id: req.collection.id(req.params.id)}, function(e, result){
    if (e) return res.send({msg: 'success'})

    res.send((result===1)?{msg:'success'}:{msg:'error'})
  })
})


app.listen(3000)
console.log('API listening on port 3000')