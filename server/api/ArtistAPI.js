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
            let errors = err.errors.map(e => {
                return {
                    message: e.message,
                    path: e.path.charAt(0).toLowerCase() + e.path.slice(1),
                }
            })

            res.status(500).json(errors);
        })
};

exports.updateArtist = (req, res, next) => {
    const artistID = req.params.id;
    const artistData = req.body;
    ArtistRepository.updateArtist(artistID, artistData)
        .then(result => {
            res.status(200).json({message: 'Artist updated', artist: result});
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

exports.deleteArtist = (req, res, next) => {
    const artistId = req.params.id;
    ArtistRepository.getAdmins()
        .then(result => {
            result.map(r => r.dataValues.Id).forEach(a => {
                if (a == artistId) {
                    throw new Error('No admin delete')
                }
            })
        })
        .then(() => {
            ArtistRepository.deleteArtist(artistId)
                .then(result => {
                    console.log("NO WAY")
                    return res.status(200).json({message: 'Removed artist', artist: result});
                })
                .catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    return next(err);
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 401;
            }
            return next(err);
        })
};