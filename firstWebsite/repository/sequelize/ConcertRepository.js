const Sequelize = require('sequelize');

// const Artist = require("../../model/sequelize/Artist");
const Concert = require("../../model/sequelize/Concert");
const ArtistOnConcert = require("../../model/sequelize/ArtistOnConcert");
const concertSchema = require("../../model/joi/Concert")

exports.getConcerts = () => {
    return Concert.findAll();
}

exports.getConcertById = (Id) => {
    return Concert.findByPk(Id);
};

exports.createConcert = (data) => {
    const newData ={
        Venue: data.Venue,
        StartDate: data.StartDate,
        FinishDate: data.FinishDate,
    }

    return Concert.create(newData);
};

exports.updateConcert = (id, data) => {
    const concertId = id
    const newData = {
        Venue: data.Venue,
        StartDate: data.StartDate == '' ? null: data.StartDate,
        FinishDate: data.FinishDate == '' ? null: data.FinishDate,
    };

    return Concert.update(newData, {
        where: {Id: concertId}
    });

    // const concertId = id
    // const venue = data.Venue;
    // const startDate = data.StartDate == '' ? null: data.StartDate;
    // const finishDate = data.FinishDate == '' ? null: data.FinishDate;
    //
    // return Concert.update({
    //     Venue: venue,
    //     StartDate: startDate,
    //     FinishDate: finishDate
    // },{
    //     where: { Id: concertId }
    // });
};

exports.deleteConcert = (Id) => {
    return Concert.destroy({
        where: { id: Id }
    });
};

exports.deleteManyArtistsOnConcert = (ids) => {
    return ArtistOnConcert.find({ Id: { [Sequelize.Op.in]: ids }});
};
