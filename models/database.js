var pg = require('pg');
var connectionString = "postgres://$OPENSHIFT_POSTGRESQL_DB_HOST:$OPENSHIFT_POSTGRESQL_DB_PORT";
// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/leaderboard';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE scores(id SERIAL PRIMARY KEY, name VARCHAR(255), score INTEGER)');
query.on('end', function() { client.end(); });
