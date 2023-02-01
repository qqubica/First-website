const express = require('express');
const router = express.Router();

const artistOnConcertApiController = require('../../api/ArtistOnConcertAPI');

router.get('/', artistOnConcertApiController.getArtistsOnConcerts);
router.get('/:id', artistOnConcertApiController.getArtistsOnConcertsById);
router.post('/', artistOnConcertApiController.createArtistOnConcert);
router.put('/:id', artistOnConcertApiController.updateArtistOnConcert);
router.delete('/:id', artistOnConcertApiController.deleteArtistOnConcert);

module.exports = router;