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
        navLocation: 'artist'
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
                navLocation: 'artist'
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
                navLocation: 'artist'
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
};

exports.updateArtist = (req, res, next) => {
    ArtistRepository.updateArtist(req.body.id, req.body)
        .then((result) => {
            res.redirect('/artist');
        })
};

exports.deleteArtist = (req, res, next) => {
    ArtistRepository.deleteArtist(req.params.id)
        .then((result) => {
            res.redirect('/artist');
        });
};