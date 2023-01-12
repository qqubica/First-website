var express = require('express');
var router = express.Router();

const concertController = require('../controllers/concertController');

router.get('/', concertController.showArtistList);
router.get('/add', concertController.showAddArtistForm);
router.get('details/:concertId', concertController.showArtistDetails);

module.exports = router;