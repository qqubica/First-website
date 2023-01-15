exports.showArtistList = (req, res, next) => {
    res.render('Pages/Artist/list', { navLocation: 'artist' })
};

exports.showAddArtistForm = (req, res, next) => {
    res.render('Pages/Artist/form', { navLocation: 'artist' });
};

exports.showArtistDetails = (req, res, next) => {
    res.render('Pages/Artist/form-details', { navLocation: 'artist' });
};