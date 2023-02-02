const express = require('express');
const router = express.Router();

const concertApiController = require('../../api/ConcertAPI');

const isAuth = require('../../middleware/isAuth');

router.get('/', concertApiController.getConcerts);
router.get('/:id', isAuth, concertApiController.getConcertById);
router.post('/', isAuth, concertApiController.createConcert);
router.put('/:id', isAuth, concertApiController.updateConcert);
router.delete('/:id', isAuth, concertApiController.deleteConcert);

module.exports = router;
