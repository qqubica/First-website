exports.showConcertList = (req, res, next) => {
    res.render('Pages/Concert/list', { navLocation: 'concert' });
};

exports.showAddConcertForm = (req, res, next) => {
    res.render('Pages/Concert/form', {navLocation: 'concert'});
};

exports.showConcertDetails= (req, res, next) => {
    res.render('Pages/Concert/form-details', { navLocation: 'concert' });
};