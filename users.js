function User(name, id, tag, handle, following, img, pw, favorites) {
  this.name = name;
  this.id = id;
  this.tagline = tag;
  this.handle = handle;
  this.following = following;
  this.img = img;
  this.pw = pw;
  this.favorites = favorites;
}

var userCollection = function users() {
  var users = [
    new User('Viet Le', 1, 'Camp was a lot different for me as a kid', '@viethle126',
    ['@bgnewuch', '@treezrppl2', '@skofman', '@alysiasaquil', '@91ajames', '@arunpaulgopul', '@brianwalen', '@metcalfec', '@coreysl', '@little78926', '@jnguyen', '@mike.field', '@niralpokal', '@tputs001', '@zane'], 'img/viet.png', 'viet', [1,3,6]),
    new User('Ben Gnewuch', 2, '*incoherent mumbling*', '@bgnewuch', ['@viethle126', '@treezrppl2', '@skofman', '@alysiasaquil', '@91ajames', '@arunpaulgopul', '@brianwalen', '@metcalfec', '@coreysl', '@little78926', '@jnguyen', '@mike.field', '@niralpokal', '@tputs001', '@zane'], 'img/ben.png', 'ben', [5,6,7]),
    new User('Nathan Walston', 3, 'Treezrppl2 guyz', '@treezrppl2', ['@bgnewuch', '@viethle126', '@skofman', '@alysiasaquil', '@91ajames', '@arunpaulgopul', '@brianwalen', '@metcalfec', '@coreysl', '@little78926', '@jnguyen', '@mike.field', '@niralpokal', '@tputs001', '@zane'],
    'img/nathan.png', 'nathan', [1,8,9]),
    new User('Shlomo Kofman', 4, 'You speak, I skof', '@skofman', ['@bgnewuch', '@treezrppl2', '@viethle126', '@alysiasaquil', '@91ajames', '@arunpaulgopul', '@brianwalen', '@metcalfec', '@coreysl', '@little78926', '@mike.field', '@niralpokal', '@tputs001', '@zane'], 'img/alysia.png', 'alysia', [2,6,8]),
    new User('Arun Gopul', 6, '', '@arunpaulgopul', ['@bgnewuch', '@treezrppl2', '@viethle126'], 'img/arun.png', 'arun', [2,6,8]),
    new User('Andrew Valasquez', 7, '', '@91ajames', ['@bgnewuch', '@treezrppl2', '@viethle126'], 'img/andrew.png', 'andrew', [2,6,8]),
    new User('Brian Walen', 8, '', '@brianwalen', ['@bgnewuch', '@treezrppl2', '@viethle126'], 'img/brian.png', 'brian', [2,6,8]),
    new User('Chris Metcalfe', 9, '', '@metcalfec', ['@bgnewuch', '@treezrppl2', '@viethle126'], 'img/chris.png', 'chris', [2,6,8]),
    new User('Corey Lin', 10, '', '@coreysl', ['@bgnewuch', '@treezrppl2', '@viethle126'], 'img/corey.png', 'corey', [2,6,8]),
    new User('Justin Nguyen', 11, '', '@jnguyen', ['@bgnewuch', '@treezrppl2', '@viethle126'], 'img/justin.png', 'justin', [2,6,8]),
    new User('John Huang', 12, '', '@little78926', ['@bgnewuch', '@treezrppl2', '@viethle126'], 'img/john.png', 'john', [2,6,8]),
    new User('Mike Field', 13, '', '@mike.field', ['@bgnewuch', '@treezrppl2', '@viethle126'], 'img/mike.png', 'mike', [2,6,8]),
    new User('Niral Pokal', 14, '', '@niralpokal', ['@bgnewuch', '@treezrppl2', '@viethle126'], 'img/niral.png', 'niral', [2,6,8]),
    new User('Tom Putsawatanachai', 15, '', '@tputs001', ['@bgnewuch', '@treezrppl2', '@viethle126'], 'img/tom.png', 'tom', [2,6,8]),
    new User('Zane DeFazio', 16, '', '@zane', ['@bgnewuch', '@treezrppl2', '@viethle126'], 'img/zane.png', 'zane', [2,6,8]),
  ];

  function getUsers() {
    return users;
  }

  function changeUser(newUser) {
    for(var i = 0; i < users.length; i++) {
      if(users[i].handle == newUser.handle) {
        users[i] = newUser;
        return users;
      }
    }
    users.push(newUser);
    return users;
  }

  function getUser(handle) {
    for(var i = 0; i < users.length; i ++) {
      if(users[i].handle == handle.toLowerCase() || users[i].name.toLowerCase() == handle.toLowerCase()) {
        return users[i];
      }
    }
    return 404;
  }

  function login(credentials) {
    for(var i = 0; i < users.length; i++) {
      if(credentials.handle == users[i].handle) {
        if(credentials.pw == users[i].pw) {
          return users[i];
        }
        else {
          return 401;
        }
      }
    }
    return 404;
  }

  return {
    user: getUser,
    users: getUsers,
    change: changeUser,
    authorize: login
  }
}

module.exports = userCollection();
