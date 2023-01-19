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
                artisOnConcert: {},
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

    ArtistOnConcerRepository.getArtistsOnConcertsById(id)
        .then(aOc => {
            const artists = []
            const concerts = []
            artists.push(aOc.dataValues.artistOnConcert.dataValues)
            concerts.push(aOc.dataValues.performedDuring.dataValues)

            res.render('Pages/ArtistOnConcert/form', {
                artisOnConcert: aOc.dataValues,
                artists: artists,
                concerts: concerts,
                pageTitle: 'Szczegóły występu',
                formMode: 'edit',
                btnLabel: 'Edytuj występ',
                formAction: '../edit',
                navLocation: 'artistOnConcert'
            });
        });
};

exports.showDetailsArtistOnConcertForm = (req, res, next) => {
    const artistOnConcertId = req.params.artistOnConcertId
    ArtistOnConcerRepository.getArtistsOnConcertsById(artistOnConcertId)
        .then(x => {
            certenArtist = [x.dataValues.artistOnConcert.dataValues];
            certenConcert = [x.dataValues.performedDuring.dataValues]

            res.render('Pages/ArtistOnConcert/form', {
                artisOnConcert: x.dataValues,
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

};

exports.updateArtistOnConcert = (req, res, next) => {

};

exports.deleteArtistOnConcert = (req, res, next) => {

};
