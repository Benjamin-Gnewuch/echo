var Faker = require('Faker');

function Tweet(tweeterId, text, date) {
  this.id = tweeterId;
  this.text = text;
  this.date = stringify(date);
}

var tweetCollection = function() {
  var tweets = [];

  function getTweets(id) {
    userTweets = [];
    for(var i = 0; i < tweets.length; i++) {
      if(tweets[i].id == id) {
        userTweets.push(tweets[i]);
      }
    }
    return userTweets;
  }

  function allTweets() {
    console.log(tweets);
    return tweets;
  }

  function newTweet(id, text, date) {
    userTweets.push(new Tweet(id, text, date));
  }
  return {
    userTweets: getTweets,
    all: allTweets,
    newTweet: newTweet
  }
}

function makeTweets(tweets, id, num) {
  for(var i = 0; i < num; i++) {
    var temp = new Tweet(id, Faker.Lorem.sentence(), Date.now());
    tweets.push(temp);
  }
}

module.exports = tweetCollection();
