const ConcertRepository = require('../repository/sequelize/ConcertRepository');
const ArtistOnConcerRepository = require('../repository/sequelize/ArtistOnConcertRepository')
const ArtistRepository = require('../repository/sequelize/ArtistRepository');

exports.showArtistOnConcertList = (req, res, next) => {
    ArtistOnConcerRepository.getArtistsOnConcerts()
        .then(aOc => {
            return aOc.map(x => {
                return {
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
    res.render('Pages/ArtistOnConcert/from', { navLocation: 'artistOnConcert' });
};

exports.showArtistOnConcertDetails = (req, res, next) => {
    res.render('Pages/ArtistOnConcert/form-details', { navLocation: 'artistOnConcert' });
};
