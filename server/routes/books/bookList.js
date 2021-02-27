const server = require('../../index');

// Note: Could be paginated. Not paginating for now
const bookListHandler = (req, res) => {
  return res.send(req.app.locals.jsonBooks);
};

module.exports = bookListHandler;
