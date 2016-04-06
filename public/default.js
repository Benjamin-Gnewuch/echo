var tweetLocation = document.getElementById('tweet-list');
var favoriteLocation = document.getElementById('favorite-list');
var landingTweetLocation = document.getElementById('landing-tweets');
var landingRow = document.getElementById('first-row');
var lineBreak = document.createElement('br');
var loginSubmit = document.getElementById('login-submit');
var landingPageLocation = document.getElementById('landing-page');
var profilePageLocation = document.getElementById('profile-page');
var rowCounter = 0;
var mainUser;
var loggedin = false;

//Used for testing, main user is the loggedin user until login is added
function setMainUser(user) {
  mainUser = user;

  prepProfile(mainUser);
}

//Gets ALL tweets
function getTweets(method) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/tweets');
  xhr.send();

  xhr.addEventListener('load', function() {
    var tweets = JSON.parse(xhr.responseText);
    method(tweets)
  });
}

function prepFeed(tweets) {
  console.log('prepFeed');
  clearTweets();

  for(var i = tweets.length-1; i >= 0; i--) {
    var tweet = tweets[i];
    if(mainUser.following.indexOf(tweet.handle) != -1 || tweet.handle == mainUser.handle){
      matchUser(tweet, makeTweet);
    }
  }
}

//Creates a new tweet, combining data from tweets and user, calls generateTweet
function makeTweet(tweet, user) {
  var tweet = new Tweet(user.name, tweet.handle, tweet.text, user.img, tweet.date, tweet.id, tweet.favoriteCount);
  generateTweet(tweet);
}

getTweets(prepLanding);

function prepLanding(tweets) {
  console.log('prepLanding');

  for(var i = tweets.length-1; i >= 0; i--) {
    matchUser(tweets[i], makeLandingTweet);
  }
}

function makeLandingTweet(tweet, user) {
  var tweet = new Tweet(user.name, tweet.handle, tweet.text, user.img, tweet.date, tweet.id, tweet.favoriteCount);
  landingTweetFoundation(tweet);
}

function landingTweetFoundation(tweet) {
  var newRow = document.createElement('div');
  newRow.className = 'row bordered';

  var col = document.createElement('div');
  col.className = 'col-md-4 col-sm-4';

  if(rowCounter == 3) {
    rowCounter = 0;
    landingRow = newRow;
    landingTweetLocation.appendChild(newRow);
    newRow.appendChild(col);
  }
  else {
    landingRow.appendChild(col);
  }
  rowCounter++;

  var tweetPanel = document.createElement('div');
  tweetPanel.className = 'panel panel-default landing-tweet';
  var panelBody = document.createElement('div');
  panelBody.className = ('panel-body tweet')

  tweetPanel.dataset.type = 'tweet';
  tweetPanel.dataset.handle = tweet.handle;
  tweetPanel.dataset.tweetid = tweet.id;
  tweetPanel.appendChild(panelBody);
  col.appendChild(tweetPanel);

  tweetContent(panelBody, tweet);
}

//Gets users from backend, matches a user to the tweet, then calls callback
function matchUser(tweet, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/users');
  xhr.send();

  xhr.addEventListener('load', function() {
    var users = JSON.parse(xhr.responseText);

    for(var i = 0; i < users.length; i++) {
      if(users[i].handle == tweet.handle) {
        callback(tweet, users[i]);
      }
    }
  });
}

//Tweet constructor
function Tweet(name, handle, content, img, date, id, favoriteCount) {
  this.name = name;
  this.handle = handle;
  this.content = content;
  this.img = img;
  this.date = date;
  this.id = id;
  this.favoriteCount = favoriteCount;
}

//Takes in a tweet, sets up location in DOM, then calls tweetContent
function generateTweet(tweet) {
  var tweetElement = document.createElement('a');
  tweetElement.className = 'list-group-item tweet background';

  tweetElement.dataset.type = 'tweet';
  tweetElement.dataset.handle = tweet.handle;
  tweetElement.dataset.tweetid = tweet.id;
  tweetLocation.appendChild(tweetElement);
  tweetContent(tweetElement, tweet);
}

//Creates a media object and fills it with a tweet's data, appends to the DOM
function tweetContent(location, tweet) {
  console.log('tweetContent');
  var media = document.createElement('div');
  media.className = 'media';
  location.appendChild(media);

  var mediaLeft = document.createElement('div');
  mediaLeft.className = 'media-left media-top';
  media.appendChild(mediaLeft);

  var mediaImg = document.createElement('img');
  mediaImg.className = 'media-object tweet-icon img-rounded';
  mediaImg.src = tweet.img;
  mediaLeft.appendChild(mediaImg);

  var mediaBody = document.createElement('div');
  mediaBody.className = 'media-body';
  media.appendChild(mediaBody);

  var tweetName = document.createElement('h4');
  tweetName.className = 'media-heading';
  tweetName.textContent = tweet.name;
  mediaBody.appendChild(tweetName);

  var tweetHandle = document.createElement('small');
  tweetHandle.className = 'media-heading';
  tweetHandle.textContent = ' ' + tweet.handle;
  tweetName.appendChild(tweetHandle);

  var tweetTime = setDate(tweet.date);
  var tweetDate = document.createElement('p');
  tweetDate.textContent = tweetTime.toDateString();
  mediaBody.appendChild(tweetDate);

  var tweetText = document.createElement('h4');
  tweetText.className = 'tweet-text';
  tweetText.textContent = tweet.content;
  mediaBody.appendChild(tweetText);

  tweetButtons(mediaBody, tweet);
}

function tweetButtons(location, tweet) {
  var buttonRow = document.createElement('div');
  buttonRow.className = 'row';

  var retweetCol = document.createElement('div');
  retweetCol.className = 'col-md-3 col-md-offset-1 col-sm-4 col-sm-offset-1';
  buttonRow.appendChild(retweetCol);

  var retweet = document.createElement('a');
  retweet.href = "#";
  retweet.dataset.tweetid = tweet.id;
  retweet.dataset.type = 'icon-btn';
  retweet.dataset.id = 'retweet';

  var retweetIcon = document.createElement('i');
  retweetIcon.className = 'fa fa-retweet fa-lg';

  retweet.appendChild(retweetIcon);
  retweetCol.appendChild(retweet);

  var favoriteCol = document.createElement('div');
  favoriteCol.className = 'col-md-3 col-sm-4';
  buttonRow.appendChild(favoriteCol);

  var favorite = document.createElement('a');

  favorite.href = "#";
  favorite.className = 'active';
  favorite.dataset.tweetid = tweet.id;
  favorite.dataset.type = 'icon-btn';
  favorite.dataset.id = 'favorite';

  var favoriteIcon = document.createElement('i');

  if(isFavorite(tweet.id)) {
    favoriteIcon.className = 'fa fa-star fa-lg';
  }
  else {
    favoriteIcon.className = 'fa fa-star-o fa-lg';
  }

  var badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = tweet.favoriteCount;

  favorite.appendChild(favoriteIcon);
  favorite.appendChild(badge);
  favoriteCol.appendChild(favorite);
  buttonRow.appendChild(favoriteCol);

  location.appendChild(buttonRow);
}

//Takes in the date from a tweet, and creates a Date object to be returned
function setDate(date) {
  var newDate = new Date();
  newDate.setMonth(date.month, date.day);
  newDate.setYear(date.year);
  newDate.setHours(date.hours, date.minutes)

  return newDate;
}

//Clears all tweets in the DOM
function clearTweets() {
  console.log('clearTweets');

  var tweets = document.getElementById('tweet-list');
  while(tweets.firstChild) {
    tweets.removeChild(tweets.firstChild);
  }
}

loginSubmit.addEventListener('submit', function(event) {
  event.preventDefault();

  login();
})

document.addEventListener('click', function(event) {
  function findTarget(clicked) {
    for(var target = clicked; target != document; target = target.parentNode) {
      if(target.hasAttribute('data-type')) {
        console.log(target);
        return target;
      }
    }
  }
  var target = findTarget(event.target);
  handleEvent(target)
});

//Handles events sent to it from Global Event Listener
function handleEvent(target) {
  console.log('handleEvent');

  if(target.dataset.type == 'tweet' || target.dataset.type == 'user') {
    getProfile(target.dataset.handle, prepProfile);
  }
  else if(target.dataset.type == 'button') {
    handleButton(target);
  }
  else if(target.dataset.type == 'icon-btn') {
    handleIcon(target);
  }
}

//Specifically handles any button clicked
function handleButton(target) {
  console.log('handleButton');

  if(target.dataset.id == 'follow') {
    toggleFollowing(target.dataset.handle);
    pushUser(mainUser);
    getProfile(target.dataset.handle, populateProfile)
  }
  else if(target.dataset.id == 'home') {
    if(loggedin) {
      prepProfile(mainUser);
      getTweets(prepFeed);
    }
    else {
      show(landingPageLocation);
    }
  }
  else if(target.dataset.id == 'login-submit') {
    login();
  }
  else if(target.dataset.id == 'log') {
    if(target.textContent == 'Log Out') {
      logout();
    }
  }
  else if(target.dataset.id == 'shout-submit') {
    shout();
    setTimeout(function() {
      getTweets(prepFeed);
    }, 1000);
  }
  else if(target.dataset.id == 'feed') {
    getTweets(prepFeed);
  }
  else if(target.dataset.id == 'favorites') {
    getTweets(getFavorites);
  }
}

function handleIcon(target) {
  if(loggedin) {
    if(target.dataset.id == 'retweet') {
      retweet(target);
    }
    else if(target.dataset.id == 'favorite') {
      favorite(target);
    }
  }
}

function retweet(icon) {
  getTweet(icon.dataset.tweetid, buildTweet);
  prepProfile(mainUser);
}

function buildTweet(tweet) {
  var newShout = document.getElementById('new-shout-text');
  newShout.value = 'ECHO: ' + tweet.handle + ' ' + tweet.text;
  console.log(newShout);
  shout();
}

function isFavorite(id) {
  if(mainUser != null) {
    for(var i = 0; i < mainUser.favorites.length; i++) {
      if(mainUser.favorites[i] == id) {
        return true;
      }
    }
  }
  return false;
}

function favorite(icon) {
  var star = icon.firstChild;
  var badge = star.nextSibling;

  if(star.className == 'fa fa-star-o fa-lg') {
    star.className = 'fa fa-star fa-lg';
    mainUser.favorites.push(Number(icon.dataset.tweetid));
    mainUser.favorites.sort(function(a,b) {
      return a-b;
    });
    updateTweet('increase', icon.dataset.tweetid);
    badge.textContent++;
    console.log(mainUser.favorites);
  }
  else {
    star.className = 'fa fa-star-o fa-lg';
    unfavorite(icon.dataset.tweetid);
    badge.textContent--;
    updateTweet('decrease', icon.dataset.tweetid);
  }
  pushUser(mainUser);
}

function unfavorite(id) {
  for(var i = 0; i < mainUser.favorites.length; i++) {
    if(mainUser.favorites[i] == id) {
      mainUser.favorites.splice(i,1);
    }
  }
}

function getFavorites(tweets) {
  console.log('getFavorites');
  clearFavorites();

  for(var i = tweets.length-1; i >= 0; i--) {
    if(mainUser.favorites.indexOf(tweets[i].id) != -1) {
      matchUser(tweets[i], prepFavorites);
    }
  }
}

function prepFavorites(tweet, user) {
  console.log('prepFavorites');

  var tweet = new Tweet(user.name, tweet.handle, tweet.text, user.img, tweet.date, tweet.id,tweet.favoriteCount);

  var tweetElement = document.createElement('a');
  tweetElement.className = 'list-group-item tweet background';

  tweetElement.dataset.type = 'tweet';
  tweetElement.dataset.handle = tweet.handle;
  tweetElement.dataset.tweetid = tweet.id;
  favoriteLocation.appendChild(tweetElement);
  tweetContent(tweetElement, tweet);
}

function clearFavorites() {
  console.log('clearFavorites');

  while(favoriteLocation.firstChild) {
    favoriteLocation.removeChild(favoriteLocation.firstChild);
  }
}

function shout() {
  console.log('shout');
  var newShout = document.getElementById('new-shout-text').value;
  console.log(newShout);
  if(newShout != "") {
    var time = new Date();

    collapseShout();

    var date = makeDate(time.getMonth(), time.getDate(), time.getFullYear(), time.getHours(), time.getMinutes())
    console.log(time);

     var shoutToSend = {
       handle: mainUser.handle,
       text: newShout,
       date: date
     }
     pushTweet(shoutToSend);
  }
}

function collapseShout() {
  var inputDiv = document.getElementById('newShoutInput');
  var inputField = document.getElementById('new-shout-text');
  inputField.value = '';
  inputDiv.className = 'vspace1 collapse';
  inputDiv.setAttribute('aria-expanded', 'false');
}

function getTweet(id, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/gettweet');
  xhr.setRequestHeader('Content-Type', 'application/json');
  var data = {id: id};
  var payload = JSON.stringify(data);
  xhr.send(payload);

  xhr.addEventListener('load', function() {
    var response = JSON.parse(xhr.responseText);
    var message = response.message;
    callback(message);
  });
}

function updateTweet(direction, id) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/updatefavorite');
  xhr.setRequestHeader('Content-Type', 'application/json');
  var data = {direction: direction, id: id};
  var payload = JSON.stringify(data);
  xhr.send(payload);

  xhr.addEventListener('load', function() {
    var response = JSON.parse(xhr.responseText);
    var message = response.message;
    console.log(message);
  });
}

function pushTweet(tweet) {
  console.log(tweet);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/pushtweet');
  xhr.setRequestHeader('Content-Type', 'application/json');
  var payload = JSON.stringify(tweet);
  xhr.send(payload);

  xhr.addEventListener('load', function() {
    var response = JSON.parse(xhr.responseText);
    var message = response.message;
  });
}

//Sends credentials to backend to see if they match a user, will either reply with 401, 404, or user object
function login() {
  console.log('login');

  var handle = document.getElementById('login-handle').value;
  var pw = document.getElementById('login-pw').value;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/authorize');
  xhr.setRequestHeader('Content-Type', 'application/json');
  var data = {handle: handle, pw: pw};
  var payload = JSON.stringify(data);
  xhr.send(payload);

  xhr.addEventListener('load', function() {
    var response = JSON.parse(xhr.responseText);
    var message = response.message;

    if (message == 404) {
      console.log(message);
    }
    else if (message == 401) {
      console.log(message);
    }
    else {
      setMainUser(message);
      hideModal();
      toggleLoggedIn();
      getTweets(prepFeed);
    }
  });
}

function hideModal() {
  console.log('hideModal');

  var body = document.querySelector('body');
  body.className = '';
  var modal = document.getElementById('login-modal');
  modal.className = 'modal fade';
  var modalFade = document.getElementsByClassName('modal-backdrop')[0];
  modalFade.className = '';
  modal.style = "display:none";
}

function logout() {
  console.log('logout');

  mainUser = {};
  toggleLoggedIn();
  show(landingPageLocation);
}

function toggleLoggedIn() {
  console.log('toggleLoggedIn');

  var loginButton = document.getElementById('login-btn');
  if(loggedin) {
    loggedin = false;
    loginButton.textContent = 'Log In';
    loginButton.dataset.toggle = 'modal';
  }
  else {
    loggedin = true;
    loginButton.textContent = 'Log Out';
    loginButton.dataset.toggle = '';
  }
}

//Calls: clearTweets, clearFollowing, populateProfile, and profileTweets
//calls getProfile and sets it each user the person is following to be populated
function prepProfile(user) {
  console.log('prepProfile');
  console.log(user);
  clearTweets();
  show(profilePageLocation);
  collapseShout();
  clearFollowing();
  populateProfile(user);
  profileTweets(user);
  getTweets(getFavorites);


  for(var i = 0; i < user.following.length; i++) {
    getProfile(user.following[i], populateFollowing);
  }
}

function showTabs() {
  console.log('showTabs');
  var feedTab = document.getElementById('feed-tab');
  var favoriteTab = document.getElementById('favorites-tab');

  feedTab.className = 'active';
  favoriteTab.className = '';
}

function hideTabs() {
  console.log('hideTabs');
  var feedTab = document.getElementById('feed-tab');
  var favoriteTab = document.getElementById('favorites-tab');

  feedTab.className = 'active conceal';
  favoriteTab.className = 'conceal';

  var feedTabTweets = document.getElementById('feed');
  var favoriteTabTweets = document.getElementById('favorites');

  feedTabTweets.className = 'tab-pane fade active in';
  favoriteTabTweets.className = 'tab-pane fade';
}

//Gets all tweets, takes the ones posted by user, builds each tweet, and sends it to generateTweet
function profileTweets(user) {
  console.log('profileTweets');

  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/tweets');
  xhr.send();

  xhr.addEventListener('load', function() {
    var tweets = JSON.parse(xhr.responseText);

    var userTweets = [];
    for(var i = 0; i < tweets.length; i++) {
      if(tweets[i].handle == user.handle) {
        userTweets.push(tweets[i]);
      }
    }

    for(var i = userTweets.length-1; i >= 0; i--) {
      makeTweet(userTweets[i], user);
    }
  });
}

//Sends a handle to the backend to get the matching user, sends the user to the callback
function getProfile(handle, method) {
  console.log('getProfile');
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/getprofile');
  var handle = {handle: handle};
  xhr.setRequestHeader('Content-Type', 'application/json');
  var payload = (JSON.stringify(handle));
  xhr.send(payload);

  xhr.addEventListener('load', function(event) {
    var response = JSON.parse(xhr.responseText);
    var user = response.message;

    method(user);
  });
}

//Takes a user and sends them to the backend to update database
function pushUser(user) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/pushuser');
  xhr.setRequestHeader('Content-Type', 'application/json');
  var payload = JSON.stringify(user);
  xhr.send(payload);

  xhr.addEventListener('load', function() {
    var response = JSON.parse(xhr.responseText);
    var message = response.message;
  });
}

//Takes a user, and puts their info into the profile header, calls checkFollowing
function populateProfile(user){
  console.log('polulateProfile');
  var profPic = document.getElementById('profile-img');
  var username = document.getElementById('username');
  var handle = document.getElementById('handle');
  var tagline = document.getElementById('tagline');

  profPic.src = user.img;
  username.textContent = user.name;
  handle.textContent = user.handle;
  tagline.textContent = user.tagline;

  checkFollowing(user);
}

//Takes a user, and populates a location in the Following box in the DOM
function populateFollowing(user) {
  var location = document.getElementById('following');
  location.className = 'list-group';

  var link = document.createElement('a');
  link.className = 'list-group-item following';
  link.dataset.handle = user.handle;
  link.dataset.type = 'user';

  location.appendChild(link);

  var media = document.createElement('div');
  media.className = 'media hoffset1';
  link.appendChild(media);

  var mediaLeft = document.createElement('div');
  mediaLeft.className = 'media-left media-top';
  media.appendChild(mediaLeft);

  var mediaImg = document.createElement('img');
  mediaImg.className = 'media-object smaller-icon img-rounded';
  mediaImg.src = user.img;
  mediaLeft.appendChild(mediaImg);

  var mediaBody = document.createElement('div');
  mediaBody.className = 'media-body';
  media.appendChild(mediaBody);

  var name = document.createElement('span');
  name.className = 'vpsacenone';
  name.textContent = user.name;
  mediaBody.appendChild(name);

  var newLine = document.createElement('br');
  mediaBody.appendChild(newLine);

  var handle = document.createElement('span');
  handle.textContent = user.handle;
  mediaBody.appendChild(handle);
}

//Takes a handle, if user is being followed, unfollow, if not, then add to follow
function toggleFollowing(handle) {
  for(var i = 0; i < mainUser.following.length; i++) {
    if(mainUser.following[i] == handle) {
      mainUser.following.splice(i,1);
      return;
    }
  }
  mainUser.following.push(handle);
}

//Takes a user, decide 'Follow' button text based on if mainUser is following them
function checkFollowing(user) {
  setTimeout(function() {
    console.log('checkFollowing');
    var follow = document.getElementById('btn-follow-shout');
    follow.className = 'btn btn-primary vspace4';
    follow.dataset.handle = user.handle;

    if(loggedin) {
      var following = mainUser.following.toString();
      follow.className = 'btn btn-primary btn-lg vspace4';

      if (user.handle == mainUser.handle) {
        follow.textContent = 'New Shout';
        follow.dataset.toggle = 'collapse';
        follow.dataset.target = '#newShoutInput';
        follow.removeAttribute('data-type');
        follow.removeAttribute('data-id');
        follow.setAttribute('aria-expanded', 'true');
        follow.setAttribute('aria-controls', 'collapseExample');
        showTabs();
      }
      else {
        hideTabs();
        follow.dataset.id = 'follow';
        follow.dataset.type = 'button';
        follow.removeAttribute('data-toggle');
        follow.removeAttribute('aria-expanded');
        follow.removeAttribute('data-target');
        follow.removeAttribute('aria-controls');

        if(following.includes(user.handle)) {
          follow.textContent = 'Following';
        }
        else {
          follow.textContent = 'Follow';
        }
      }
    }
    else {
      follow.className = 'conceal';
    }
  },1);
}

//Clears the DOM of all the users followed by current profile
function clearFollowing() {
  var following = document.getElementById('following');
  while(following.firstChild) {
    following.removeChild(following.firstChild);
  }
}

function show(page) {
  var pages = [landingPageLocation, profilePageLocation];
  for (var i = 0; i < pages.length; i++) {
    if (pages[i].id == page.id) {
      pages.splice(i,1);
    }
  }
  var classes = page.className.split(' ');
  if (classes.indexOf('hide') > -1) {
    var location = classes.indexOf('hide');
    classes.splice(location, 1);
    page.className = classes.join(' ');
  }

  hide(pages);
}

function hide(pages) {
  for (var i = 0; i < pages.length; i++) {
    var classes = pages[i].className.split(' ');
    if (classes.indexOf('hide') === -1) {
      classes.push('hide');
      pages[i].className = classes.join(' ');
    }
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
