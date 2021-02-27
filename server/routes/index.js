const router = require('express').Router();
const bookListHandler = require('./books/bookList');
const bookDetailHandler = require('./books/bookDetail');
const pingHandler = require('./admin/ping');

router.get('/ping', pingHandler);
router.get('/api/books', bookListHandler);
router.get('/api/books/:id', bookDetailHandler);

module.exports = router;
