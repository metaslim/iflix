'use strict';

let Content = require('./api/models/content');
let User = require('./api/models/user');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rate_db');

module.exports.seed_data = function () {
  seedUsers();
  seedContent();
  disconnectDb();
};

function seedUsers() {
  const users = [
    { first_name: 'Tony', last_name: 'Stark' },
    { first_name: 'Thor', last_name: 'Odinson' },
    { first_name: 'Hank', last_name: 'Pym' },
    { first_name: 'Bruce', last_name: 'Banner' },
    { first_name: 'Janet', last_name: 'Dyne' },
    { first_name: 'Steve', last_name: 'Rogers' },
    { first_name: 'Clinton', last_name: 'Barton' },
    { first_name: 'Natasha', last_name: 'Romanoff' },
    { first_name: 'Samuel', last_name: 'Wilson' },
    { first_name: 'James', last_name: 'Rhodes' },
    { first_name: 'Peter', last_name: 'Parker' },
    { first_name: 'Scott', last_name: 'Lang' },
    { first_name: 'James', last_name: 'Barnes' },
    { first_name: 'Sharon', last_name: 'Carter' },
    { first_name: 'Stephen', last_name: 'Strange' },
    { first_name: 'Peter', last_name: 'Quill' }
  ];

  for (let user of users) {
    let newUser = new User(user);
    newUser.save();
  }
}

function seedContent() {
  const contents = [
    { name: 'Iron Man', year: 2008 },
    { name: 'The Incredible Hulk', year: 2008},
    { name: 'Iron Man 2', year: 2010},
    { name: 'Thor', year: 2011},
    { name: 'Captain America: The First Avenger', year: 2011},
    { name: 'The Avengers', year: 2012},
    { name: 'Iron Man 3', year: 2013},
    { name: 'Thor: The Dark World', year: 2013},
    { name: 'Captain America: The Winter Soldier', year: 2014},
    { name: 'Guardians of the Galaxy', year: 2014},
    { name: 'Avengers: Age of Ultron', year: 2015},
    { name: 'Ant-Man', year: 2015},
    { name: 'Captain America: Civil War', year: 2016},
    { name: 'Doctor Strange', year: 2016},
    { name: 'Guardians of the Galaxy Vol. 2', year: 2017},
    { name: 'Spider-Man: Homecoming', year: 2017},
    { name: 'Thor: Ragnarok', year: 2017}

  ];

  for (let content of contents) {
    let newContent = new Content(content);
    newContent.save();
  }
}

function disconnectDb() {
  setTimeout(function() {
    mongoose.connection.close()
  }, 5000);
}
