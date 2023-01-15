const ArtistRepository = require('../repository/sequelize/ArtistRepository');

exports.getArtists = (req, res, next) => {
    ArtistRepository.getArtists()
        .then((artists) => {
            res.status(200).json(artists);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getArtistsById = (req, res, next) => {
    const id = req.params.id;
    ArtistRepository.getArtistsById(id)
        .then((artists) => {
            if(!artists) {
                res.status(404).json({
                    message: 'Artist with id: ' + id + ' not found',
                });
            } else {
                res.status(200).json(artists)
            }
        });
};

exports.createArtist = (req, res, next) => {
    ArtistRepository.createArtist(req.body)
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

exports.updateArtist = (req, res, next) => {
    const artistID = req.params.id;
    console.log(artistID)
    ArtistRepository.updateArtist(artistID, req.body)
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

exports.deleteArtist = (req, res, next) => {
    const artistId = req.params.id;
    ArtistRepository.deleteArtist(artistId)
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