const express = require('express');
const router = express.Router();

const artistApiController = require('../../api/ArtistAPI');

router.get('/', artistApiController.getArtists);
router.get('/:id', artistApiController.getArtistsById);
router.post('/', artistApiController.createArtist);
router.put('/:id', artistApiController.updateArtist);
router.delete('/:id', artistApiController.deleteArtist);

module.exports = router;