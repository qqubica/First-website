const Artist = require("../../model/sequelize/Artist");
const Concert = require("../../model/sequelize/Concert");
const ArtistOnConcert = require("../../model/sequelize/ArtistOnConcert");

exports.getArtistsOnConcerts = () => {
    return ArtistOnConcert.findAll({
        include: [
            {
                model: Artist,
                as: 'artistOnConcert',
            },
            {
                model: Concert,
                as: 'performedDuring',
            },
        ],
    });
};

exports.getArtistsOnConcertsById = (artistOnConcertId) => {
    return ArtistOnConcert.findByPk(artistOnConcertId);
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