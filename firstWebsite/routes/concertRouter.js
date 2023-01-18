var express = require('express');
var router = express.Router();

const concertController = require('../controllers/concertController');

router.get('/', concertController.showConcertList);
router.get('/add', concertController.showAddConcertForm);
router.get('/edit/:concertId', concertController.showEditConcertDetails);
router.get('/details/:concertId', concertController.showConcertDetails);

router.post('/add', concertController.addConcert);
router.post('/edit', concertController.updateConcert);
router.post('/delete/:id', concertController.deleteConcert);

module.exports = router;
