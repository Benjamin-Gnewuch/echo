var tweetCollection = function tweets() {
  var tweets = [
    makeTweet('@skofman', "This is the first tweet", 'December 17, 1995 03:24:00'),
    makeTweet('@viethle126', "This is the second tweet", 'February 28, 2001 05:15:17'),
    makeTweet('@treezrppl2', "This is the third tweet", 'July 21, 2010 01:22:13'),
    makeTweet('@viethle126', "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet('@skofman', "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet('@treezrppl2', "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet('@treezrppl2', "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet('@viethle126', "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet('@skofman', "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet('@skofman', "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet('@treezrppl2', "Nonsense", 'July 21, 2010 01:22:13'),
  ];

  function getTweets() {
    return tweets;
  }
  return {
    tweets: getTweets
  }
}

function makeTweet(handle, text, date) {
  return {
    handle: handle,
    text: text,
    date: date
  }
}

module.exports = tweetCollection();