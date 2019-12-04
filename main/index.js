console.log("starting up!!");

const express = require('express');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'jasminesis',
  host: '127.0.0.1',
  database: 'vigilante',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

// Init express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('*', (request, response) => {
    const queryString = 'SELECT * FROM highscores'

    pool.query(queryString, (err, result) => {
    
      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        console.log('query result:', result);
    
        // redirect to home page
        response.send( result.rows );
      }
    });
});


const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);