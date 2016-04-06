var express = require('express');
var app = express();

var tweetCollection = require('./tweets.js');
var userCollection = require('./users.js');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(express.static('./public'));

app.get('/tweets', function(req, res) {
  res.json(tweetCollection.tweets());
});

app.get('/users', function(req, res) {
  res.json(userCollection.users());
});

app.post('/gettweet', jsonParser, function(req, res) {
  res.json({message: tweetCollection.tweet(req.body.id)});
});

app.post('/getprofile', jsonParser, function(req, res) {
  var users = userCollection.users();
  for(var i = 0; i < users.length; i++) {
    if(req.body.handle == users[i].handle) {
      res.json({message: users[i]});
    }
  }
});

app.post('/pushuser', jsonParser, function(req, res) {
  res.send(userCollection.change(req.body));
});

app.post('/updatefavorite', jsonParser, function(req, res) {
  console.log(req.body);
  var tweets;
  if(req.body.direction == 'increase') {
    tweets = tweetCollection.incrementFavorite(req.body.id);
  }
  else {
    tweets = tweetCollection.decrementFavorite(req.body.id);
  }

  res.json({message: tweets});
})

app.post('/pushtweet', jsonParser, function(req, res) {
  res.send(tweetCollection.addTweet(req.body));
});

app.post('/authorize', jsonParser, function(req, res) {
  res.send({message: userCollection.authorize(req.body)});
})

app.listen(8080);

var port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log('Listening on port' + port);
});
