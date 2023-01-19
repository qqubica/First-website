var express = require('express');
var router = express.Router();

const artistOnConcertController = require('../controllers/artistOnConcertController');

router.get('/', artistOnConcertController.showArtistOnConcertList);
router.get('/add', artistOnConcertController.showAddArtistOnConcertForm);
router.get('/edit/:artistOnConcertId', artistOnConcertController.showEditArtistOnConcertForm);
router.get('/details/:artistOnConcertId', artistOnConcertController.showDetailsArtistOnConcertForm);

router.post('/add', artistOnConcertController.addArtistOnConcert);
router.post('/edit', artistOnConcertController.updateArtistOnConcert);
// router.get('/delete/:id', artistOnConcertController.);

module.exports = router;
