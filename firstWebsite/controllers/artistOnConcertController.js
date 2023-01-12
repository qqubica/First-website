exports.showArtistOnConcertList = (req, res, next) => {
    res.render('Pages/ArtistOnConcert' , res);
}

exports.showAddArtistOnConcertForm = (req, res, next) => {
    res.render('Pages/ArtistOnConcert/from' , res);
}

exports.showArtistOnConcertDetails = (req, res, next) => {
    res.render('Pages/ArtistOnConcert/details' , res);
}
