const Artist = require("../../model/sequelize/Artist");
const artistSchema = require("../../model/joi/Artist")

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

    const vRev = artistSchema.validate(newData, {
        abortEarly: false,
    });

    if(vRev.error){
        return Promise.reject(vRes.error);
    }

    return Artist.create(newData);
};

// no server side validtion
// exports.createArtist = (Data) => {
//     return Artist.create({
//         FirstName: Data.FirstName,
//         LastName: Data.LastName,
//         Pseudonym: Data.Pseudonym,
//         Birthdate: Data.Birthdate,
//     });
// };

exports.updateArtist = async (Id, data) => {
    const newData = {
        FirstName: data.firstName,
        LastName: data.lastName,
        Pseudonym: data.pseudonym,
        Birthdate: data.birthdate == '' ? null: data.birthdate,
    };

    const vRev = artistSchema.validate(newData, {
        abortEarly: false,
    });

    if (vRev.error){
        return Promise.reject(vRev.error);
    }

    const artExist = await Artist.findByPk(Id);
    console.log(!artExist);
    if(!artExist){
        console.log("true")
        return;
    }

    return Artist.update(newData, {
        where: { Id: Id}
    });

    // if(!await Artist.findByPk(Id)){
    //     return;
    // }
    //
    // const firstName = data.firstName;
    // const lastName = data.lastName;
    // const pseudonym = data.pseudonym;
    // const birthdate = data.birthdate == '' ? null: data.birthdate;
    //
    // return Artist.update({
    //     FirstName: firstName,
    //     LastName: lastName,
    //     Pseudonym: pseudonym,
    //     Birthdate: birthdate
    // }, {
    //     where: { Id: Id }
    // });
}

exports.deleteArtist = (Id) => {
    return Artist.destroy({
        where: {id: Id}
    });
};
