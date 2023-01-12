exports.showArtistOnConcertList = (req, res, next) => {
    res.render('Pages/ArtistOnConcert/list', { navLocation: 'artistOnConcert' });
}

exports.showAddArtistOnConcertForm = (req, res, next) => {
    res.render('Pages/ArtistOnConcert/from', { navLocation: 'artistOnConcert' });
}

exports.showArtistOnConcertDetails = (req, res, next) => {
    res.render('Pages/ArtistOnConcert/details', { navLocation: 'artistOnConcert' });
}
