var Faker = require('Faker');

function User(name, id, tag, handle, following, followers, img) {
  this.name = name;
  this.id = id;
  this.tagline = tag;
  this.handle = handle;
  this.following = following;
  this.followers = followers;
  this.img = img;
}

var userCollection = function users() {
  var users = [
    new User('Viet', 1, 'Camp was a lot different for me as a kid', '@viethle126', [2,3,4], [2,3,4], 'img/viet.png'),
    new User('Ben', 2, '*incoherent mumbling*', '@bgnewuch', [1,3,4], [1,3,4], 'img/ben.png'),
    new User('Nathan', 3, 'Treezrppl2 guyz', '@treezrppl2', [1,2,4], [1,2,4], 'img/nathan.png'),
    new User('Schlomo', 4, 'You speak, I skof', '@skofman', [1,2,3], [1,2,3], 'img/schlomo.png')
  ];

  function getUsers() {
    return users;
  }

  return {
    users: getUsers
  }
}

module.exports = userCollection();
