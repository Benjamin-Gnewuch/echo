var tweetLocation = document.getElementById(tweet-list);

var follow = document.getElementById('btn-follow');

follow.addEventListener('click', function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/viet');
  xhr.send();

  xhr.addEventListener('load', function(event) {
    console.log(xhr.response);
    console.log('');
    console.log(xhr.responseText);
  });
})




function Tweet(name, handle, content, link) {
  this.name = name;
  this.handle = handle;
  this.content = content;
  this.link = link||null;
}

function newTweet() {
  var tweetItem = document.createElement('li');
  tweetItem.className = 'list-group-item';

  tweetContent(tweetItem);
}

function tweetContent(location) {
  var media = document.createElement('div');
  media.className = 'media';
  location.appendChild(media);

  var mediaLeft = document.createElement('div');
  mediaLeft.className = 'media-left media-top';
  media.appendChild(mediaLeft);

  var mediaImg = document.createElement('img');
  mediaImg.className = 'media-object';
  mediaLeft.appendChild(mediaImg);

  var mediaBody = document.createElement('div');
  mediaBody.className = 'media-body';
  media.appendChild(mediaBody);

  var tweetHandle = document.createElement('h5');
  tweetHandle.className = 'media-heading';
  mediaBody.appendChild(tweetHandle);

  var tweetText = document.createElement('p');
  tweetText.className = 'tweet-text';
  mediaBody.appendChild(tweetText);

}
