var express = require('express');
var app = express();

var tweets = require('./tweets.js');
var tweetCollection = tweets;

var users = require('./users.js');
var userCollection = users;

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(express.static('./public'));

app.get('/', function(req, res) {
  res.sendFile(index.html)
});

app.get('/timeline', function(req, res) {
  res.json(tweetCollection.tweets());
});

app.get('/users', function(req, res) {
  res.json(userCollection.users());
})

// app.post('/getprofile', jsonParser, function(req, res) {
//   res.json({message: users[req.body.id]});
// });

app.listen(8080);
