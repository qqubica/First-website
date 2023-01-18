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
            res.render('Pages/Concert/form', {
                concert: concert,
                pageTitle: 'Edytuj koncert',
                formMode: 'edit',
                btnLabel: 'Edytuj koncert',
                formAction: '../edit',
                navLocation: 'concert'
            });
        });
};

exports.showConcertDetails =   (req, res, next) => {
    const concertId = req.params.concertId;
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
                formAction: 'artist',
                navLocation: 'concert',
            })
        })
    // ConcertRepository.getConcertById(concertId)
    //     .then(concert => {
    //         res.render('Pages/Concert/form', {
    //             concert: concert.dataValues,
    //             performances: performances.dataValues,
    //             pageTitle: 'Szczegóły koncertu',
    //             formMode: 'showDetails',
    //             formAction: 'artist',
    //             navLocation: 'concert',
    //         })
    //     });
};

exports.addConcert = (req, res, next) => {
    console.log(req.body)
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
    console.log(req.body)
    ConcertRepository.updateConcert(req.body.Id, req.body)
        .then((result) => {
            res.redirect('/concert');
        })
};

exports.deleteConcert = (req, res, next) => {
    console.log("deleting");
    ConcertRepository.deleteConcert(req.params.id)
        .then((result) => {
            res.redirect('/concert');
        })
};