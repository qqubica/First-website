const Artist = require("../../model/sequelize/Artist");
const Concert = require("../../model/sequelize/Concert");
const ArtistOnConcert = require("../../model/sequelize/ArtistOnConcert");

exports.getArtistsOnConcerts = () => {
    return ArtistOnConcert.findAll({include: [
            {
                model: Artist,
                as: 'artist',
            },
            {
                model: Concert,
                as: 'concert',
            },
        ]});
};

exports.getArtistsOnConcertsById = (artistOnConcertId) => {
    return ArtistOnConcert.findByPk(artistOnConcertId,
        {
            include: [
                {model: Artist, as: 'artists',},
                {model: Concert, as: 'concerts'},
            ]
        });
};

exports.createArtistOnConcert = (newArtistOnConcert) => {
    console.log(JSON.stringify(newArtistOnConcert))
    return ArtistOnConcert.create({
        ArtistId: newArtistOnConcert.ArtistId,
        ConcertId: newArtistOnConcert.ConcertId,
        PerformanceNumber: newArtistOnConcert.PerformanceNumber,
        PerformanceTime: newArtistOnConcert.PerformanceTime,
    });
};

exports.updateArtistOnConcert = (artistOnConcertId, data) => {
    return ArtistOnConcert.update(data, {where: {id: artistOnConcertId}});
};

exports.deleteArtistOnConcert = (artistOnConcertId) => {
    return ArtistOnConcert.destroy({
        where: { id: artistOnConcertId },
    });
};