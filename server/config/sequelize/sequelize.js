const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql', 'root', 'root', {
    host: '0.0.0.0',
    dialect: 'mysql'
});

module.exports = sequelize;
