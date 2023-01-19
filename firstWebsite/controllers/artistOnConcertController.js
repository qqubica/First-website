const ConcertRepository = require('../repository/sequelize/ConcertRepository');
const ArtistOnConcerRepository = require('../repository/sequelize/ArtistOnConcertRepository')
const ArtistRepository = require('../repository/sequelize/ArtistRepository');

exports.showArtistOnConcertList = (req, res, next) => {
    ArtistOnConcerRepository.getArtistsOnConcerts()
        .then(aOc => {
            return aOc.map(x => {
                return {
                    id: x.dataValues.Id,
                    firstName: x.dataValues.artistOnConcert.dataValues.FirstName,
                    lastName: x.dataValues.artistOnConcert.dataValues.LastName,
                    pseudonym: x.dataValues.artistOnConcert.dataValues.Pseudonym,
                    venue: x.dataValues.performedDuring.dataValues.Venue,
                }
            })
        })
        .then(listData => {
            res.render('Pages/ArtistOnConcert/list', {
                artistsOnConcerts: listData,
                navLocation: 'artistOnConcert'
            });
        })
};

exports.showAddArtistOnConcertForm = (req, res, next) => {
    ArtistRepository.getArtists()
        .then(artists => {
            allArtists = artists.map(x=>x.dataValues)
            return ConcertRepository.getConcerts()
        })
        .then(concerts => {
            allConcerts = concerts.map(x=>x.dataValues);
            res.render('Pages/ArtistOnConcert/form', {
                artistOnConcert: {},
                concerts: allConcerts,
                artists: allArtists,
                pageTitle: 'Nowy występ podczas koncertu',
                formMode: 'createNew',
                btnLabel: 'Dodaj występ',
                formAction: '/artistOnConcert/add',
                navLocation: 'artistOnConcert'
            });
        })
};

exports.showEditArtistOnConcertForm = (req, res, next) => {
    const id = req.params.artistOnConcertId
    console.log("showing")
    ArtistRepository.getArtists()
        .then(artists => {
            allArtists = artists.map(x=>x.dataValues);
            return ConcertRepository.getConcerts()
        })
        .then(concerts => {
            allConcerts = concerts.map(x=>x.dataValues)
            return ArtistOnConcerRepository.getArtistsOnConcertsById(id)
        })
        .then((aOc)=>{
            console.log(aOc.dataValues)
            res.render('Pages/ArtistOnConcert/form', {
                artistOnConcert: aOc.dataValues,
                artists: allArtists,
                concerts: allConcerts,
                pageTitle: 'Szczegóły występu',
                formMode: 'edit',
                btnLabel: 'Edytuj występ',
                formAction: '../edit',
                navLocation: 'artistOnConcert'
            });
        })
    // ArtistOnConcerRepository.getArtistsOnConcertsById(id)
    //     .then(aOc => {
    //
    //     });
};

exports.showDetailsArtistOnConcertForm = (req, res, next) => {
    const artistOnConcertId = req.params.artistOnConcertId
    ArtistOnConcerRepository.getArtistsOnConcertsById(artistOnConcertId)
        .then(x => {
            certenArtist = [x.dataValues.artistOnConcert.dataValues];
            certenConcert = [x.dataValues.performedDuring.dataValues]

            res.render('Pages/ArtistOnConcert/form', {
                artistOnConcert: x.dataValues,
                artists: certenArtist,
                concerts: certenConcert,
                pageTitle: 'Szczegóły występu',
                formMode: 'showDetails',
                formAction: 'artistOnConcert',
                navLocation: 'artistOnConcert',
            })
        })
};

exports.addArtistOnConcert = (req, res, next) => {
    console.log(req.body)
    const data = {
        ArtistId: req.body.Artysta,
        ConcertId: req.body.Venue,
        PerformanceNumber: req.body.PerformanceId,
        PerformanceTime: req.body.Duration,
    };

    ArtistOnConcerRepository.createArtistOnConcert(data)
        .then((result) => {
            res.body = result
            res.redirect('/artistOnConcert');
        })
};

exports.updateArtistOnConcert = (req, res, next) => {

    const data = {
        ArtistId: req.body.Artysta,
        ConcertId: req.body.Venue,
        PerformanceNumber: req.body.PerformanceId,
        PerformanceTime: req.body.Duration,
    }
    ArtistOnConcerRepository.updateArtistOnConcert(req.body.Id, data)
        .then(result => {
            res.redirect('/artistOnConcert')
        })
};

exports.deleteArtistOnConcert = (req, res, next) => {
    ArtistOnConcerRepository.deleteArtistOnConcert(req.params.id)
        .then(result => {
            res.redirect('/artistOnConcert');
        })
};
