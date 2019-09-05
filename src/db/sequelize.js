const Sequelize = require('sequelize');
const sequelize = new Sequelize('mydb', 'postgres', 'root', {
    dialect: 'postgres'
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully :)');
    })
    .catch(err => {
        console.error('Unable to connect to the database :( ', err);
    });

sequelize.sync();

module.exports = sequelize;