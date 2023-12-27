const Sequelize = require('sequelize');
const config = require('./config.json')

const{ username, password, database, host, dialect } = config.development

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect
})

sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})