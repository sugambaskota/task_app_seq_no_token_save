const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');
const User = require('./user');

const Task = sequelize.define('task', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {
    timestamps: false
});

module.exports = Task;











// const mongoose = require('mongoose');
// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// });

// module.exports = Task