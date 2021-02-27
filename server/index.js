const server = require('./app');
const csv = require('csvtojson');

// Note: Not checking if dataset can fit in memory
csv()
  .fromFile('./books.csv')
  .then(result => {
    server.locals.jsonBooks = result;
    //set port and log to the console
    server.listen(3000, () => console.log('server listening'));
  });
