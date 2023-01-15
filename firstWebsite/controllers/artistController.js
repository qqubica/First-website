const ArtistRepository = require('../repository/sequelize/ArtistRepository');

exports.showArtistList = (req, res, next) => {
    ArtistRepository.getArtists()
        .then(artists => {
            // console.log(artists);
            res.render('Pages/Artist/list', {
                artists: artists,
                navLocation: 'artist'
            });
        });
};

exports.showAddArtistForm = (req, res, next) => {
    res.render('Pages/Artist/form', { navLocation: 'artist' });
};

exports.showArtistDetails = (req, res, next) => {
    res.render('Pages/Artist/form-details', { navLocation: 'artist' });
};