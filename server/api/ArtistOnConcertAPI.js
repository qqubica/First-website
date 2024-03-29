const ArtistOnConcertRepository = require('../repository/sequelize/ArtistOnConcertRepository');

exports.getArtistsOnConcerts = (req, res, next) => {
    ArtistOnConcertRepository.getArtistsOnConcerts()
        .then((artistOnConcerts) => {
            let data = artistOnConcerts.filter(aOc => {
                return req.user?.credentials == 'admin' || aOc.ArtistId == req.user?.userId
            })
            return res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getArtistsOnConcertsById = (req, res, next) => {
    const artistOnConcertId = req.params.id;
    ArtistOnConcertRepository.getArtistsOnConcertsById(artistOnConcertId)
        .then((artistOnConcertId) => {
            if(!artistOnConcertId) {
                res.status(404).json({
                    message: 'Artist with id: ' + artistOnConcertId + ' not found',
                });
            } else {
                res.status(200).json(artistOnConcertId)
            }
        });
};

exports.createArtistOnConcert = (req, res, next) => {
    ArtistOnConcertRepository.createArtistOnConcert(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            let errors = err.errors.map(e => {
                return {
                    message: e.message,
                    path: e.path.charAt(0).toLowerCase() + e.path.slice(1),
                }
            })

            res.status(500).json(errors);
        });
};

exports.updateArtistOnConcert = (req, res, next) => {
    const artistOnConcertId = req.params.id;
    ArtistOnConcertRepository.updateArtistOnConcert(artistOnConcertId, req.body)
        .then(result => {
            res.status(200).json({message: 'Artist on concert updated', artistOnConcert: result});
        })
        .catch(err => {
            let errors = err.errors.map(e => {
                return {
                    message: e.message,
                    path: e.path.charAt(0).toLowerCase() + e.path.slice(1),
                }
            })

            res.status(500).json(errors);
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
