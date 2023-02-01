const Sequelize = require('sequelize')
const sequelize = require('../../config/sequelize/sequelize');
const concertModel = require('./Concert')
const artistModel = require('./Artist')

const ArtistOnConcert = sequelize.define('ArtistOnConcert', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    ArtistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: concertModel,
            key: 'Id',
        },
        validate: {
            notNull: {
                msg: "Pole jest wymagane",
            },
            notEmpty: {
                msg: "Pole jest wymagane",
            },
            isExist: function (val) {
                artistModel.findByPk(val).then(artist => {
                    if (!artist){
                        return { msg: 'Nie znaleziono artysty' }
                    }
                })
            },
        },
    },
    ConcertId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: concertModel,
            key: 'Id',
        },
        validate: {
            notNull: {
                msg: "Pole jest wymagane",
            },
            notEmpty: {
                msg: "Pole jest wymagane",
            },
            isExist: function (val) {
                concertModel.findByPk(val).then(concert => {
                    if (!concert){
                        return { msg: 'Nie znaleziono koncertu' }
                    }
                })
            },
        },
    },
    PerformanceNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Pole jest wymagane",
            },
            notEmpty: {
                msg: "Pole jest wymagane",
            },
        },
    },
    PerformanceTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Pole jest wymagane",
            },
            notEmpty: {
                msg: "Pole jest wymagane",
            },
        },
    },
});

module.exports = ArtistOnConcert;