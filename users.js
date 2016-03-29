function User(name, id, tag, tweets, following, followers) {
  this.name = name;
  this.id = id;
  this.tagline = tag;
  this.tweets = tweets;
  this.following = following;
  this.followers = followers;
}

function Tweet(id, text) {
  this.id = id;
  this.text = text;
}



var vietTweets = [new Tweet(1, 'Yay camp is over'), new Tweet(2, 'I am Viet'), new Tweet(3, 'OMG so awkard')];

var benTweets = [new Tweet(1, 'Sick life'), new Tweet(2, 'I am Ben'), new Tweet(3, '*incoherent mumbling*')];

var nathanTweets = [new Tweet(1, 'I got this API thing'), new Tweet(2, 'I am Nathan'), new Tweet(3, 'This API sux')];

var schlomoTweets = [new Tweet(1, 'Nathan is wrong'), new Tweet(2, 'I am Schlomo'), new Tweet(3, 'Stop bothering Viet.')];

User.prototype.addFollower = function(follower) {
  this.followers.push(follower);
}
User.prototype.addFollowing = function(following) {
  this.following.push(following);
}

var viet = new User('Viet', 1, 'Camp was a lot different for me as a kid', vietTweets, [], []);

var ben = new User('Ben', 2, 'Nothing to put here', benTweets, [], []);

var nathan = new User('Nathan', 3, 'Treezrppl2', nathanTweets, [], []);

var schlomo = new User('Schlomo', 4, 'You are wrong.', schlomoTweets, [], []);

var users = {viet, ben, nathan, schlomo};


viet.addFollower(ben);
viet.addFollower(nathan);
viet.addFollower(schlomo);

ben.addFollower(viet);
ben.addFollower(nathan);
ben.addFollower(schlomo);

nathan.addFollower(ben);
nathan.addFollower(viet);
nathan.addFollower(schlomo);

schlomo.addFollower(ben);
schlomo.addFollower(nathan);
schlomo.addFollower(viet);

viet.addFollowing(ben);
viet.addFollowing(nathan);
viet.addFollowing(schlomo);

ben.addFollowing(viet);
ben.addFollowing(nathan);
ben.addFollowing(schlomo);

nathan.addFollowing(ben);
nathan.addFollowing(viet);
nathan.addFollowing(schlomo);

schlomo.addFollowing(ben);
schlomo.addFollowing(nathan);
schlomo.addFollowing(viet);

module.exports = users;
