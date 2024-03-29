const express = require('express');
const router = express.Router();

const artistOnConcertApiController = require('../../api/ArtistOnConcertAPI');

const isAuth = require('../../middleware/isAuth');

router.get('/', isAuth, artistOnConcertApiController.getArtistsOnConcerts);
router.get('/:id', isAuth, artistOnConcertApiController.getArtistsOnConcertsById);
router.post('/', isAuth, artistOnConcertApiController.createArtistOnConcert);
router.put('/:id', isAuth, artistOnConcertApiController.updateArtistOnConcert);
router.delete('/:id', isAuth, artistOnConcertApiController.deleteArtistOnConcert);

module.exports = router;