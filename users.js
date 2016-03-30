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

var viet = new User('Viet', 1, 'Camp was a lot different for me as a kid', 'viethle126', [2,3,4], [2,3,4], 'img/viet.png');

var ben = new User('Ben', 2, 'Nothing to put here', 'bgnewuch', [1,3,4], [], 'img/ben.png');

var nathan = new User('Nathan', 3, 'Treezrppl2', 'Treezrppl2', [1,2,4], [1,2,4], 'img/nathan.png');

var schlomo = new User('Schlomo', 4, 'You speak, I skof', 'skofman', [1,2,3], [1,2,3], 'img/schlomo.png');

var users = {
  1: viet,
  2: ben,
  3: nathan,
  4: schlomo
};

module.exports = users;
