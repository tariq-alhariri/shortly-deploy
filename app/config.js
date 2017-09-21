var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/shortlydb');


var db=mongoose.connection;
db.om('error',console.console.error.bind(console,'connection error:'));
db.once('open',function () {
  console.log('Mongodb connection is open !');
})

module.exports = db;

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
  },
  useNullAsDefault: true
});

// link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');


      // user.string('username', 100).unique();
      // user.string('password', 100);



db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();

      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});


