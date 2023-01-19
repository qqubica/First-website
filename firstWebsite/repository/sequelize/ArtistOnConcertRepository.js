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
    return ArtistOnConcert.findByPk(artistOnConcertId, {
        include: [
            {
                model: Artist,
                as: 'artistOnConcert',
            },
            {
                model: Concert,
                as: 'performedDuring',
            },
        ]
    });
};

exports.createArtistOnConcert = (newArtistOnConcert) => {
    const newData = {
        ArtistId: newArtistOnConcert.ArtistId,
        ConcertId: newArtistOnConcert.ConcertId,
        PerformanceNumber: newArtistOnConcert.PerformanceNumber,
        PerformanceTime: newArtistOnConcert.PerformanceTime,
    }

    return ArtistOnConcert.create(newData);

    // return ArtistOnConcert.create({
    //     ArtistId: newArtistOnConcert.ArtistId,
    //     ConcertId: newArtistOnConcert.ConcertId,
    //     PerformanceNumber: newArtistOnConcert.PerformanceNumber,
    //     PerformanceTime: newArtistOnConcert.PerformanceTime,
    // });
};

exports.updateArtistOnConcert = async (artistOnConcertId, data) => {
    return ArtistOnConcert.update(data, {
        where: {id: artistOnConcertId}
    });
};

exports.deleteArtistOnConcert = (artistOnConcertId) => {
    return ArtistOnConcert.destroy({
        where: { id: artistOnConcertId },
    });
};