const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const server = express();

//accept only JSON
server.use(bodyParser.json());
server.use(cors());

// add routes
server.use('/', routes);

// missing route handler
server.use('*', (req, res) => {
  return res.status(404).send('Not found');
});

// generic error handler
server.use((err, req, res, next) => {
  console.error({
    message: err.message,
    stack: err.stack,
    type: 'error',
  });
  return res.status(400).send({
    error: err.message,
  });
});

module.exports = server;
