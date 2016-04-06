var faker = require('faker');

var tweetCollection = function tweets() {
  var tweets = [
    makeTweet('@skofman', 'This is the first tweet', makeDate(12, 17, 1995, 03, 24), 0, 0),
    makeTweet('@viethle126', 'This is the second tweet', makeDate(2, 28, 2001, 05, 15), 1, 2),
    makeTweet('@treezrppl2', 'This is the third tweet', makeDate(7, 21, 2010, 01, 22), 2, 1),
    makeTweet('@viethle126', 'This is the fourth tweet', makeDate(7, 21, 2010, 01, 22), 3, 1),
    makeTweet('@skofman', 'This is the fifth tweet', makeDate(7, 21, 2010, 01, 22), 4, 0),
    makeTweet('@treezrppl2', 'This is the sixth tweet', makeDate(7, 21, 2010, 01, 22), 5, 1),
    makeTweet('@treezrppl2', 'This is the seventh tweet', makeDate(7, 21, 2010, 01, 22), 6, 2),
    makeTweet('@viethle126', 'This is the eighth tweet', makeDate(7, 21, 2010, 01, 22), 7, 1),
    makeTweet('@skofman', 'This is the ninth tweet', makeDate(7, 21, 2010, 01, 22), 8, 2),
    makeTweet('@skofman', 'This is the tenth tweet', makeDate(7, 21, 2010, 01, 22), 9, 1),
    makeTweet('@treezrppl2', 'This is the eleventh tweet', makeDate(7, 21, 2010, 01, 22), 10, 0),
    makeTweet('@bgnewuch', 'lkJSDFBlkjsbfkrbfaf', makeDate(7, 22, 2010, 01, 14), 11, 0)
  ];

  function getTweets() {
    return tweets;
  }

  function getTweet(id) {
    for(var i = 0; i < tweets.length; i++) {
      if(tweets[i].id == id) {
        return tweets[i];
      }
    }
    return 'Tweet not found';
  }

  function incrementFavorite(id) {
    for(var i = 0; i < tweets.length; i++) {
      if(tweets[i].id == id) {
        tweets[i].favoriteCount++;
      }
    }
    return tweets;
  }

  function decrementFavorite(id) {
    for(var i = 0; i < tweets.length; i++) {
      if(tweets[i].id == id) {
        tweets[i].favoriteCount--;
      }
    }
    return tweets;
  }

  function addTweet(tweet) {
    var newTweet = makeTweet(tweet.handle, tweet.text, tweet.date, tweets.length, 0);
    tweets.push(newTweet);
    return tweets;
  }

  return {
    tweets: getTweets,
    tweet: getTweet,
    incrementFavorite: incrementFavorite,
    decrementFavorite: decrementFavorite,
    addTweet: addTweet
  }

}

function makeTweet(handle, text, date, id, favoriteCount) {
  return {
    handle: handle,
    text: text,
    date: date,
    id: id,
    favoriteCount: favoriteCount
  }
}

function makeDate(month, day, year, hours, minutes) {
  return {
    month: month,
    day: day,
    year: year,
    hours: hours,
    minutes: minutes
  }
}

module.exports = tweetCollection();
