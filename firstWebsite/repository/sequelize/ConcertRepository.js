const Sequelize = require('sequelize');

const Artist = require("../../model/sequelize/Artist");
const Concert = require("../../model/sequelize/Concert");
const ArtistOnConcert = require("../../model/sequelize/ArtistOnConcert");
const {getConcertById} = require("../../api/ConcertAPI");

exports.getConcerts = () => {
    return Concert.findAll();
}

exports.getConcertById = (Id) => {
    return Concert.findByPk(Id);
};

exports.createConcert = (data) => {
    return Concert.create({
        Venue: data.Venue,
        StartDate: data.StartDate,
        FinishDate: data.FinishDate,
    });
};

exports.updateConcert = (id, data) => {
    const concertId = id
    const venue = data.Venue;
    const startDate = data.StartDate;
    const finishDate = data.FinishDate;

    return Concert.update({
        Venue: venue,
        StartDate: startDate,
        FinishDate: finishDate
    },{
        where: { id: concertId }
    });
};

exports.deleteConcert = (id) => {
    return Concert.destroy({
        where: { id: id }
    });
};

exports.deleteManyArtistsOnConcert = (ids) => {
    return ArtistOnConcert.find({ id: { [Sequelize.Op.in]: ids}});
};
