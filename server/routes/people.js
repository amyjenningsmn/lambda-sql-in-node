var router = require('express').Router();
var pg = require('pg');

var connectionString = require ('../db/connection').connectionString;

router.post('/', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      var result = [];
      var name = req.body.name;
      var address = req.body.address;
      var city = req.body.city;
      var state = req.body.state;
      var zip_code = req.body.zip_code;
      console.log(req.body);

      var query = client.query('INSERT INTO people (name, address, city, state, zip_code) VALUES ($1, $2, $3, $4, $5) ' +
                                'RETURNING id, name, address, city, state, zip_code', [name, address, city, state, zip_code]);

      query.on('row', function(row){
        result.push(row);
      });

      query.on('end', function() {
        done();
        res.send(result);
      });

      query.on('error', function(error) {
        console.error('Error running query:', error);
        done();
        res.status(500).send(error);
      });
    }
  });
});

router.get('/', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      var query = client.query('SELECT * FROM people');
      var results = [];
      query.on('error', function(err){
        console.log(err);
        done();
        res.sendStatus(500);
      });
      query.on('row', function(rowData){
        results.push(rowData);
      });
      query.on('end', function(){
        res.send(results);
        done();
      });
    }
  });
});

module.exports = router;
