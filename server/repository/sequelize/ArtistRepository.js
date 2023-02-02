const Artist = require("../../model/sequelize/Artist");
const authUtil = require('../../utils/authUtils')
const {hashPassword} = require("../../utils/authUtils");

exports.findByName = (name) => {
    return Artist.findOne({
        where: {
            FirstName: name
        }
    })
}

exports.getArtists = () => {
    return Artist.findAll();
};

exports.getArtistsById = (Id) => {
    return Artist.findByPk(Id);
}

exports.getAdmins = () => {
    return Artist.findAll({
        where: {
            credentials: 'admin'
        }
    })
}

exports.createArtist = (Data) => {
    let hashPass = null
    if (Data?.password){
        hashPass = authUtil.hashPassword(Data?.password)
    }
    const newData = {
        FirstName: Data.FirstName,
        LastName: Data.LastName,
        Pseudonym: Data.Pseudonym,
        Birthdate: Data.Birthdate,
        password: hashPass,
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
