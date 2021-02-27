const server = require('../../app');

const bookDetailHandler = (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookList = req.app.locals.jsonBooks;
  if (isNaN(bookId) || bookId < 0 || bookId >= bookList.length) {
    return res.status(400).send({
      error: 'Invalid book id',
    });
  }
  return res.send(bookList[bookId]);
};

module.exports = bookDetailHandler;
