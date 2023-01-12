var express = require('express');
var router = express.Router();

const concertController = require('../controllers/concertController');

router.get('/', concertController.showConcertList);
router.get('/add', concertController.showAddConcertForm);
router.get('details/:concertId', concertController.showConcertDetails);

module.exports = router;