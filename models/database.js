var pg = require('pg');
var host = process.env.OPENSHIFT_POSTGRESQL_DB_HOST;
var port = process.env.OPENSHIFT_POSTGRESQL_DB_PORT;
var connectionString = "pg://" + host + ":" + port + "/leaderboard";
// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/leaderboard';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE scores(id SERIAL PRIMARY KEY, name VARCHAR(255), score INTEGER)');
query.on('end', function() { client.end(); });
