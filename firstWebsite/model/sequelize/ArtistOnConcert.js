const Sequelize = require('sequelize')
const sequelize = require('../../config/sequelize/sequelize');

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
    },
    ConcertId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    PerformanceNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    PerformanceTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = ArtistOnConcert;