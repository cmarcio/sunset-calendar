// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our routes
const user = require('./server/routes/user-router');
const agenda = require('./server/routes/agenda-router');
const event = require('./server/routes/event-router');

const app = express();

// allow other
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  next();
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our routes
app.use('/user', user);
app.use('/agenda', agenda);
app.use('/event', event);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));