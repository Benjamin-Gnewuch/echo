var express = require('express');
var app = express();
var tweets = require('./tweets.js');
var tweetCollection = tweets;

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(express.static('./public'));

app.get('/', function(req, res) {
  res.sendFile(index.html)
});

app.get('/timeline', function(req, res) {
  res.json(tweetCollection.tweets());
});

// app.post('/getprofile', jsonParser, function(req, res) {
//   res.json({message: users[req.body.id]});
// });

app.listen(8080);
