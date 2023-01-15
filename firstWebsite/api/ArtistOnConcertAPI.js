const ArtistOnConcertRepository = require('../repository/sequelize/ArtistOnConcertRepository');

exports.getArtistsOnConcerts = (req, res, next) => {
    ArtistOnConcertRepository.getArtistsOnConcerts()
        .then((artistOnConcerts) => {
            res.status(200).json(artistOnConcerts);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getArtistsOnConcertsById = (req, res, next) => {
    const artistOnConcertId = req.params.id;
    ArtistOnConcertRepository.getArtistsOnConcertsById(artistOnConcertId)
        .then((artists) => {
            if(!artists) {
                res.status(404).json({
                    message: 'Artist with id: ' + artistOnConcertId + ' not found',
                });
            } else {
                res.status(200).json(artists)
            }
        });
};

exports.createArtistOnConcert = (req, res, next) => {
    ArtistOnConcertRepository.createArtistOnConcert(req.body)
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

exports.updateArtistOnConcert = (req, res, next) => {
    const artistOnConcertId = req.params.id;
    ArtistOnConcertRepository.updateArtistOnConcert(artistOnConcertId, req.body)
        .then(result => {
            res.status(200).json({message: 'Artist on concert updated', artistOnConcert: result});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteArtistOnConcert = (req, res, next) => {
    const artistOnConcertId = req.params.id;
    ArtistOnConcertRepository.deleteArtistOnConcert(artistOnConcertId, req.body)
        .then(result => {
            res.status(200).json({message: 'Removed artist on concert', artistOnConcert: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
