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

exports.updateArtist = (Id, data) => {
    const artistId = Id;
    const firstName = data.FirstName;
    const lastName = data.LastName;
    const pseudonym = data.Pseudonym;
    const birthdate = data.Birthdate;

    return Artist.update({
        FirstName: firstName,
        LastName: lastName,
        Pseudonym: pseudonym,
        Birthdate: birthdate
    }, {
        where: { id: artistId }
    });
}

exports.deleteArtist = (Id) => {
    return Artist.destroy({
        where: {id: Id}
    });
};