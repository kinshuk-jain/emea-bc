const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csvtojson');
const cors = require('cors');

const server = express();
let jsonBooks = [];

//accept only JSON
server.use(bodyParser.json());
server.use(cors());

// healthcheck API
server.get('/ping', (req, res) => res.send('pong'));

// Note: Could be paginated. Not paginating for now
server.get('/api/books', async (req, res) => {
  res.send(jsonBooks);
});

server.get('/api/books/:id', async (req, res) => {
  const bookId = parseInt(req.params.id);

  if (isNaN(bookId) || bookId < 0 || bookId >= jsonBooks.length) {
    return res.status(400).send({
      error: 'Invalid book id',
    });
  }
  res.send(jsonBooks[bookId]);
});

// Note: Not checking if dataset can fit in memory
csv()
  .fromFile('./books.csv')
  .then(result => {
    jsonBooks = result;
    //set port and log to the console
    server.listen(3000, () => console.log('server listening'));
  });
