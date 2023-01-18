const ConcertRepository = require('../repository/sequelize/ConcertRepository');

exports.showConcertList = (req, res, next) => {
    ConcertRepository.getConcerts()
        .then(concerts => {
            res.render('Pages/Concert/list', {
                concerts: concerts,
                navLocation: 'concert'
            });
        });
};

exports.showAddConcertForm = (req, res, next) => {
    res.render('Pages/Concert/form', {
        concert: {},
        pageTitle: 'Nowy koncert',
        formMode: 'createNew',
        btnLabel: 'Dodaj koncert',
        formAction: '/concert/add',
        navLocation: 'concert'
    });
};

exports.showEditConcertDetails= (req, res, next) => {
    const concertId = req.params.concertId;
    ConcertRepository.getConcertById(concertId)
        .then(concert => {
            res.render('Pages/Concert/form-details', {
                concert: concert,
                pageTitle: 'Edytuj koncert',
                formMode: 'edit',
                btnLabel: 'Edytuj koncert',
                formAction: '../edit',
                navLocation: 'concert'
            });
        });
};

exports.showConcertDetails= (req, res, next) => {
    const concertId = req.params.concertId;
    ConcertRepository.getConcertById(concertId)
        .then(concert => {
            console.log(concert);
            res.render('Pages/Concert/form', {
                concert: concert.dataValues,
                pageTitle: 'Szczegóły koncertu',
                formMode: 'showDetails',
                formAction: 'artist',
                navLocation: 'concert',
            })
        })
};

exports.addConcert = (req, res, next) => {
    const concertData = {
        Venue: req.body.Venue,
        StartDate: req.body.StartDate == '' ? null: req.body.StartDate,
        FinishDate: req.body.FinishDate == '' ? null: req.body.FinishDate,
    };
    ConcertRepository.createConcert(concertData)
        .then((result) => {
            res.redirec('/concert');
        })
};

exports.updateConcert = (req, res, next) => {
    ConcertRepository.updateConcert(req.params.id, req.body)
        .then((result) => {
            res.redirect('/concert');
        })
};

exports.deleteConcert = (req, res, next) => {
    ConcertRepository.deleteConcert(req.params.id)
        .then((result) => {
            res.redirect('/concert');
        })
};