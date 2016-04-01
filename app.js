var express = require('express');
var app = express();

var tweetCollection = require('./tweets.js');
var userCollection = require('./users.js');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(express.static('./public'));

app.get('/timeline', function(req, res) {
  res.json(tweetCollection.tweets());
});

app.get('/users', function(req, res) {
  res.json(userCollection.users());
})

app.post('/getprofile', jsonParser, function(req, res) {
  console.log(req.body);
  var users = userCollection.users();
  for(var i = 0; i < users.length; i++) {
    console.log(users[i].handle);
    if(req.body.handle == users[i].handle) {
      res.json({message: users[i]});
    }
  }
})

app.listen(8080);
