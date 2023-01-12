exports.showConcertList = (req, res, next) => {
    res.render('Pages/Concert/list' , res);
}

exports.showAddConcertForm = (req, res, next) => {
    res.render('Pages/Concert/form' , res);
}

exports.showConcertDetails= (req, res, next) => {
    res.render('Pages/Consert/details' , res);
}
