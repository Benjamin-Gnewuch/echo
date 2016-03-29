var tweetLocation = document.getElementById('tweet-list');

var xhr = new XMLHttpRequest();
xhr.open('GET', '/viet');
xhr.send();

xhr.addEventListener('load', function(event) {
  var user = JSON.parse(xhr.responseText);
  console.log(user);

  for(var i = 0; i < user.tweets.length; i++) {
    var tweet = new Tweet(user.name, user.handle, user.tweets[i], user.img);
    newTweet(tweet);
  }
});


function Tweet(name, handle, content, img) {
  this.name = name;
  this.handle = handle;
  this.content = content;
  this.img = img||'https://www.nonehub.com/images/defaultUserAvatar.jpg';
}

function newTweet(tweet) {
  var tweetItem = document.createElement('li');
  tweetItem.className = 'list-group-item';

  tweetLocation.appendChild(tweetItem);
  tweetContent(tweetItem, tweet);
}

function tweetContent(location, tweet) {
  var media = document.createElement('div');
  media.className = 'media';
  location.appendChild(media);

  var mediaLeft = document.createElement('div');
  mediaLeft.className = 'media-left media-top';
  media.appendChild(mediaLeft);

  var mediaImg = document.createElement('img');
  mediaImg.className = 'media-object tweet-icon';
  mediaImg.src = tweet.img;
  mediaLeft.appendChild(mediaImg);


  var mediaBody = document.createElement('div');
  mediaBody.className = 'media-body';
  media.appendChild(mediaBody);

  var tweetHandle = document.createElement('h5');
  tweetHandle.className = 'media-heading';
  tweetHandle.textContent = tweet.handle;
  mediaBody.appendChild(tweetHandle);

  var tweetText = document.createElement('p');
  tweetText.className = 'tweet-text';
  tweetText.textContent = tweet.content.text;
  mediaBody.appendChild(tweetText);

  console.log(tweet.content);
}
