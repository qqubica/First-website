const Artist = require("../../model/sequelize/Artist");

exports.getArtists = () => {
    return Artist.findAll();
};

exports.getArtistsById = (Id) => {
    return Artist.findByPk(Id);
}

exports.createArtist = (Data) => {
    const newData = {
        FirstName: Data.FirstName,
        LastName: Data.LastName,
        Pseudonym: Data.Pseudonym,
        Birthdate: Data.Birthdate,
    }

    return Artist.create(newData);
};

exports.updateArtist = (Id, data) => {
    const newData = {
        FirstName: data.firstName,
        LastName: data.lastName,
        Pseudonym: data.pseudonym,
        Birthdate: data.birthdate == '' ? null: data.birthdate,
    };

    return Artist.update(newData, {
        where: { Id: Id}
    });
}

exports.deleteArtist = (Id) => {
    return Artist.destroy({
        where: {id: Id}
    });
};
