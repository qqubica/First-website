const express = require('express');
const router = express.Router();

const artistApiController = require('../../api/ArtistAPI');

const isAuth = require('../../middleware/isAuth');


router.get('/', artistApiController.getArtists);
router.get('/:id', artistApiController.getArtistsById);
router.post('/', artistApiController.createArtist);
router.put('/:id', isAuth, artistApiController.updateArtist);
router.delete('/:id', isAuth, artistApiController.deleteArtist);

module.exports = router;