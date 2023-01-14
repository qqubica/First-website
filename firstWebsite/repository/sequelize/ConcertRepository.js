const Sequelize = require('sequelize');

const Artist = require("../../model/sequelize/Artist");
const Concert = require("../../model/sequelize/Concert");
const ArtistOnConcert = require("../../model/sequelize/ArtistOnConcert");

exports.getConcerts = () => {
    return Concert.findAll();
}

exports.getConcertsById = (Id) => {
    return Concert.findByPk(Id,
        {
            include: [
                {
                    model: ArtistOnConcert,
                    as: 'artistOnConcert',
                    include: [{
                        model: Artist,
                        as: 'artist',
                    }]
                }
            ]
        });
};

exports.createConcert = (data) => {
    return Concert.create({
        Venue: data.venue,
        StartDate: data.startDate,
        FinishDate: data.FinishDate,
    });
};

exports.updateConcert = (id, data) => {
    const venue = data.venue;
    const startDate = date.startDate;
    const finishDate = date.finishDate;

    return Concert.update(data, {where: {id: id}});
}

exports.deleteConcert = (id) => {
    return Concert.destroy({
        where: { id: id }
    });
};

exports.deleteManyArtistsOnConcert = (ids) => {
    return ArtistOnConcert.find({ id: { [Sequelize.Op.in]: ids}});
};
