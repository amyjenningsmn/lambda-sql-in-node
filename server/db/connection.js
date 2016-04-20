var pg = require('pg');

var connectionString;

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/peer-sql';
}

function initializeDB(){
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.log('Error connecting to DB!', err);
      process.exit(1);
    } else {
      var query = client.query('CREATE TABLE IF NOT EXISTS people (' +
      'id SERIAL PRIMARY KEY,' +
      'name varchar(255) NOT NULL,' +
      'address varchar(255) NOT NULL,' +
      'city varchar(100) NOT NULL,' +
      'state varchar(3) NOT NULL,' +
      'zip_code varchar(5) NOT NULL);');

      query.on('end', function(){
        console.log('Successfully ensured schema exists');
        done();
      });

      query.on('error', function() {
        console.log('Error creating schema!');
        process.exit(1);
      });
    }
  });
}

module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
