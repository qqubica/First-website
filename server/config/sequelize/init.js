const sequelize = require('./sequelize');

const authUtil = require('../../utils/authUtils')
const passHash = authUtil.hashPassword('1234')

const Artist = require('../../model/sequelize/Artist');
const Concert = require('../../model/sequelize/Concert');
const ArtistOnConcert = require('../../model/sequelize/ArtistOnConcert');

module.exports = () => {
    Artist.hasMany(
        ArtistOnConcert,
        {
            as: 'artist',
            foreignKey: { name: 'ArtistId', allowNull: false },
            constraint: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    );

    Concert.hasMany(
        ArtistOnConcert,
        {
            as: 'concert',
            foreignKey: { name: 'ConcertId', allowNull: false},
            constraint: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    );

    ArtistOnConcert.belongsTo(
        Artist,
        {
            as: 'artistOnConcert',
            foreignKey: { name: 'ArtistId' }
        }
    );

    ArtistOnConcert.belongsTo(
        Concert,
        {
            as: 'performedDuring',
            foreignKey: { name: 'ConcertId' },
        }
    );

    let allArtists, allConcerts;

    return sequelize
        .sync({ force: true })
        .then(() => {
            return Artist.findAll();
        })
        .then(artists => {
            if (!artists || artists.length == 0){
                return Artist.bulkCreate([
                    {FirstName: "Kuba", LastName: "Wudrski", Pseudonym: "Student", password: passHash, credentials: 'admin'},
                    {FirstName: "Marek", LastName: "Tura", Pseudonym: "T.M", Birthdate: "2000-03-13", password: passHash},
                    {FirstName: "Arek", LastName: "Udar", Birthdate: "2012-09-20", password: passHash},
                    {FirstName: "Darek", LastName: "Dudek", Pseudonym: "DD", Birthdate: "1890-12-29", password: passHash},
                    {FirstName: "Starek", LastName: "Arek", Birthdate: "1999-11-25", password: passHash},
                ])
                    .then(() => {
                        return Artist.findAll();
                    });
            } else {
                return artists;
            }
        })
        .then( artists => {
            allArtists = artists;
            return Concert.findAll();
        })
        .then(concerts => {
            if(!concerts || concerts.length == 0){
                return Concert.bulkCreate([
                    {Venue: "Test", StartDate: "2022-12-31", FinishDate: "2023-01-01", },
                    {Venue: "Test", StartDate: "2023-07-07", FinishDate: "2023-07-10", },
                    {Venue: "Smolna", StartDate: "2023-08-18", FinishDate: "2023-08-18",},
                    {Venue: "Jasna", StartDate: "2023-03-28", FinishDate: "2023-03-28"},
                ])
                    .then(() => {
                        return Concert.findAll();
                    });
            }else {
                return concerts;
            }
        })
        .then((concerts) => {
            allConcerts = concerts;
            return ArtistOnConcert.findAll();
        })
        .then((artistOnConcert) => {
            if (!artistOnConcert || artistOnConcert.length == 0) {
                return ArtistOnConcert.bulkCreate([
                    {ArtistId: "1", ConcertId: "2", PerformanceNumber: "1", PerformanceTime: "45"},
                    {ArtistId: "2", ConcertId: "3", PerformanceNumber: "1", PerformanceTime: "60"},
                    {ArtistId: "3", ConcertId: "1", PerformanceNumber: "1", PerformanceTime: "75"},
                    {ArtistId: "4", ConcertId: "1", PerformanceNumber: "2", PerformanceTime: "30"},
                    {ArtistId: "5", ConcertId: "1", PerformanceNumber: "3", PerformanceTime: "35"},
                ])
            } else {
                return artistOnConcert;
            }
        });
};