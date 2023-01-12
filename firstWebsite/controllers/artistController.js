exports.showArtistList = (req, res, next) => {
    res.render('Pages/Artist/list', res)
}

exports.showAddArtistForm = (req, res, next) => {
    res.render('Pages/Artist/form' , res);
}

exports.showArtistDetails = (req, res, next) => {
    res.render('Pages/Artist/' , res);
}