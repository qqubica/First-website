var express = require('express');
var router = express.Router();

const concertController = require('../controllers/concertController');

router.get('/', concertController.showConcertList);
router.get('/add', concertController.showAddConcertForm);
router.get('/edit/:concertId', concertController.showEditConcertForm);
router.get('/details/:concertId', concertController.showDetailsConcertForm);

router.post('/add', concertController.addConcert);
router.post('/edit', concertController.updateConcert);
router.get('/delete/:id', concertController.deleteConcert);

module.exports = router;
