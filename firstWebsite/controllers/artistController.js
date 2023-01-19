const ArtistRepository = require('../repository/sequelize/ArtistRepository');

exports.showArtistList = (req, res, next) => {
    ArtistRepository.getArtists()
        .then(artists => {
            res.render('Pages/Artist/list', {
                artists: artists,
                navLocation: 'artist'
            });
        });
};

exports.showAddArtistForm = (req, res, next) => {
    res.render('Pages/Artist/form', {
        artist: {},
        pageTitle: 'Nowy artysta',
        formMode: 'createNew',
        btnLabel: 'Dodaj pracownika',
        formAction: '/artist/add',
        navLocation: 'artist',
        validationErrors: [],
    });
};

exports.showEditArtistDetails = (req, res, next) => {
    const artistId = req.params.artistId;
    ArtistRepository.getArtistsById(artistId)
        .then(artist => {
            res.render('Pages/Artist/form', {
                artist: artist,
                pageTitle: 'Edytuj artystę',
                formMode: 'edit',
                btnLabel: 'Edytuj artystę',
                formAction: '../edit',
                navLocation: 'artist',
                validationErrors: [],
           });
        });
};

exports.showArtistDetails = (req, res, next) => {
    const artistId = req.params.artistId;
    ArtistRepository.getArtistsById(artistId)
        .then(artist => {
            console.log(artist);
            res.render('Pages/Artist/form', {
                artist: artist.dataValues,
                pageTitle: 'Szczegóły artysty',
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'artist',
                validationErrors: [],
            });
        });
};

exports.addArtist = (req, res, next) => {
    const artistData = {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Pseudonym: req.body.pseudonym,
        Birthdate: req.body.birthdate == '' ? null: req.body.birthdate,
    };

    ArtistRepository.createArtist(artistData)
        .then((result) => {
            res.redirect('/artist');
        })
        .catch(err => {
            res.render('Pages/Artist/form', {
                artist: artistData,
                pageTitle: 'Nowy artysta',
                formMode: 'createNew',
                btnLabel: 'Dodaj pracownika',
                formAction: '/artist/add',
                navLocation: 'artist',
                validationErrors: err.error,
            })
        })
};

exports.updateArtist = (req, res, next) => {
    ArtistRepository.updateArtist(req.body.id, req.body)
        .then((result) => {
            res.redirect('/artist');
        }).catch(err => {
            res.render('Pages/Artist/form', {
                artist: req.body,
                pageTitle: 'Edytuj artystę',
                formMode: 'edit',
                btnLabel: 'Edytuj artystę',
                formAction: '../edit',
                navLocation: 'artist',
                validationErrors: err.error,
            });
    })
};

exports.deleteArtist = (req, res, next) => {
    ArtistRepository.deleteArtist(req.params.id)
        .then((result) => {
            res.redirect('/artist');
        });
};