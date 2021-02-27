const server = require('./app');
const csv = require('csvtojson');

// Note: Not checking if dataset can fit in memory
function start() {
  return csv()
    .fromFile('./books.csv')
    .then(result => {
      server.locals.jsonBooks = result;

      //set port and log to the console
      server.listen(3000, () => console.log('server listening'));
    });
}

if (process.env.NODE_ENV !== 'test') start();

module.exports = start;
