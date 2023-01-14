const Sequelize = require('sequelize');

const sequelize = new Sequelize('dev_mysql', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;