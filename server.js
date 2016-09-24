'use strict';
const express = require('express');
const path = require('path');

let	app = express(),
	port = normalizePort(process.env.PORT || '1337');

/** Serve Static Resources **/
app.use('/', express.static(path.join(__dirname, '/app')));

app.set('port', port);
app.listen(port, onListening);

/** Normalize a port into a number, string, or false. **/
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onListening() {
  console.log('Node app is running on port', app.get('port'));
}