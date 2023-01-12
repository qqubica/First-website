var express = require('express');
var router = express.Router();

const artistController = require('../controllers/artistController');

router.get('/', artistController.showArtistList);
router.get('/add', artistController.showAddArtistForm);
router.get('details/:artistId', artistController.showArtistDetails);

module.exports = router;