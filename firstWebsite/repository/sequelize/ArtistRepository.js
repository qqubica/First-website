const Artist = require("../../model/sequelize/Artist");
const Concert = require("../../model/sequelize/Concert");
const ArtistOnConcert = require("../../model/sequelize/ArtistOnConcert");

exports.getArtists = () => {
    return Artist.findAll();
};

exports.getArtistsById = (Id) => {
    return Artist.findByPk(Id);
}

exports.createArtist = (Data) => {
    return Artist.create({
        FirstName: Data.FirstName,
        LastName: Data.LastName,
        Pseudonym: Data.Pseudonym,
        Birthdate: Data.Birthdate,
    });
};

exports.updateArtist = (Id, Data) => {
    const firstName = Data.FirstName;
    const lastName = Data.LastName;
    const pseudonym = Data.Pseudonym;
    const birthdate = Data.Birthdate;

    return Artist.update(data, {where: {id: Id}});
}

exports.deleteArtist = (Id) => {
    return Artist.destroy({
        where: {id: Id}
    });
};