var express = require('express');
var router = express.Router();

const artistController = require('../controllers/artistController');

router.get('/', artistController.showArtistList);
router.get('/add', artistController.showAddArtistForm);
router.get('/edit/:artistId', artistController.showEditArtistDetails);
router.get('/details/:artistId', artistController.showArtistDetails);

router.post('/add', artistController.addArtist);
router.post('/edit', artistController.updateArtist);
router.get('/delete/:id', artistController.deleteArtist);

module.exports = router;