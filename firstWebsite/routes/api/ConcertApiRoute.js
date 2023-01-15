const express = require('express');
const router = express.Router();

const concertApiController = require('../../api/ConcertAPI');

router.get('/', concertApiController.getConcerts);
router.get('/:id', concertApiController.getConcertsById);
router.post('/', concertApiController.createConcert);
router.put('/:id', concertApiController.updateConcert);
router.delete('/:id', concertApiController.deleteConcert);

module.exports = router;
