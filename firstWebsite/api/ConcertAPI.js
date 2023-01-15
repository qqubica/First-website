const ConcertRepository = require('../repository/sequelize/ConcertRepository');

exports.getConcerts = (req, res, next) => {
    ConcertRepository.getConcerts()
        .then((artists) => {
            res.status(200).json(artists);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getConcertsById = (req, res, next) => {
    const concertId = req.params.id;
    ConcertRepository.getConcertsById(concertId)
        .then((artists) => {
            if(!artists) {
                res.status(404).json({
                    message: 'Artist with id: ' + concertId + ' not found',
                });
            } else {
                res.status(200).json(artists)
            }
        });
};

exports.createConcert = (req, res, next) => {
    ConcertRepository.createConcert(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateConcert = (req, res, next) => {
    const concertId = req.params.id;
    ConcertRepository.updateConcert(concertId, req.body)
        .then(result => {
            res.status(200).json({message: 'Artist updated', artist: result});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteConcert = (req, res, next) => {
    const concertId = req.params.id;
    ConcertRepository.deleteConcert(concertId)
        .then(result => {
            res.status(200).json({message: 'Removed artist', artist: result});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};