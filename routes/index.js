var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/leaderboard';

/* GET home page. */
router.get('/scores', function(req, res) {
  var results = [];

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }

    var query = client.query("SELECT * FROM scores ORDER BY score DESC");

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });

  });
});

router.post('/api/scores', function(req, res) {
  var results = [];

  var data = { name: req.body.name, score: req.body.score };

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }

    client.query("INSERT INTO scores(name, score) values($1, $2)", [data.name, data.score]);


    done();
    res.send('score added');
  });
});

module.exports = router;
