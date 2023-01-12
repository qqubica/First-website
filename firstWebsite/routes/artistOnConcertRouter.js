var express = require('express');
var router = express.Router();

const artistOnConcertController = require('../controllers/artistOnConcertController');

router.get('/', artistOnConcertController.showArtistOnConcertList);
router.get('/add', artistOnConcertController.showAddArtistOnConcertForm);
router.get('details/:artistOnConcertId', artistOnConcertController.showArtistOnConcertDetails);

module.exports = router;
