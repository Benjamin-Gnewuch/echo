var tweetCollection = function tweets() {
  var tweets = [
    makeTweet(1, "This is the first tweet", 'December 17, 1995 03:24:00'),
    makeTweet(2, "This is the second tweet", 'February 28, 2001 05:15:17'),
    makeTweet(3, "This is the third tweet", 'July 21, 2010 01:22:13'),
    makeTweet(2, "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet(1, "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet(3, "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet(3, "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet(2, "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet(1, "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet(1, "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet(3, "Nonsense", 'July 21, 2010 01:22:13'),
  ];

  function getTweets() {
    return tweets;
  }
  return {
    tweets: getTweets
  }
}

function makeTweet(id, text, date) {
  return {
    id: id,
    text: text,
    date: date
  }
}

module.exports = tweetCollection();
