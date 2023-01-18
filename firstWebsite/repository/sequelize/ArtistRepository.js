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

exports.updateArtist = async (Id, data) => {
    if(!await Artist.findByPk(Id)){
        return;
    }

    const firstName = data.firstName;
    const lastName = data.lastName;
    const pseudonym = data.pseudonym;
    const birthdate = data.birthdate == '' ? null: data.birthdate;

    return Artist.update({
        FirstName: firstName,
        LastName: lastName,
        Pseudonym: pseudonym,
        Birthdate: birthdate
    }, {
        where: { Id: Id }
    });
}

exports.deleteArtist = (Id) => {
    return Artist.destroy({
        where: {id: Id}
    });
};
