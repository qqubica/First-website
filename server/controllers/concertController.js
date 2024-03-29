const ConcertRepository = require('../repository/sequelize/ConcertRepository');
const ArtistOnConcerRepository = require('../repository/sequelize/ArtistOnConcertRepository')
const ArtistRepository = require('../repository/sequelize/ArtistRepository');

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
        performances: [],
        pageTitle: 'Nowy koncert',
        formMode: 'createNew',
        btnLabel: 'Dodaj koncert',
        formAction: '/concert/add',
        navLocation: 'concert',
        validationErrors: [],
    });
};

exports.showEditConcertForm = (req, res, next) => {
    const concertId = req.params.concertId;

    ConcertRepository.getConcertById(concertId)
        .then(concert => {
            res.render('Pages/Concert/form', {
                concert: concert,
                performances: [],
                pageTitle: 'Edytuj koncert',
                formMode: 'edit',
                btnLabel: 'Edytuj koncert',
                formAction: '../edit',
                navLocation: 'concert',
                validationErrors: [],
            });
        });
};

exports.showDetailsConcertForm =   (req, res, next) => {
    const concertId = req.params.concertId;
    console.log(concertId)

    ArtistOnConcerRepository.getArtistsOnConcerts()
        .then(performers => {
            return performers.map(x => x.dataValues)
                .filter(x => x.ConcertId == concertId)
                .map(x => {
                    return {
                        FirstName: x.artistOnConcert.dataValues.FirstName,
                        LastName: x.artistOnConcert.dataValues.LastName,
                        Pseudonym: x.artistOnConcert.dataValues.Pseudonym,
                        PerformanceNumber: x.PerformanceNumber,
                        PerformanceTime: x.PerformanceTime,
                    }
                })
        })
        .then(artistsDetails => {
            performers = artistsDetails;
            return ConcertRepository.getConcertById(concertId)
        })
        .then(concerts => {
            res.render('Pages/Concert/form', {
                concert: concerts.dataValues,
                performances: performers,
                pageTitle: 'Szczegóły koncertu',
                formMode: 'showDetails',
                formAction: '../edit/' + concertId,
                navLocation: 'concert',
                validationErrors: [],
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
            res.redirect('/concert');
        })
        .catch(err=>{
            res.render('Pages/Concert/form', {
                concert: concertData,
                performances: [],
                pageTitle: 'Nowy koncert',
                formMode: 'createNew',
                btnLabel: 'Dodaj koncert',
                formAction: '/concert/add',
                navLocation: 'concert',
                validationErrors: err.errors,
            })
        })
};

exports.updateConcert = (req, res, next) => {
    console.log(req.body)
    ConcertRepository.updateConcert(req.body.Id, req.body)
        .then((result) => {
            res.redirect('/concert');
        })
        .catch(err=>{
            res.render('Pages/Concert/form', {
                concert: req.body,
                performances: [],
                pageTitle: 'Szczegóły koncertu',
                formMode: 'showDetails',
                formAction: 'artist',
                navLocation: 'concert',
                validationErrors: err.errors,
            })
        })
};

exports.deleteConcert = (req, res, next) => {
    ConcertRepository.deleteConcert(req.params.id)
        .then((result) => {
            res.redirect('/concert');
        })
};