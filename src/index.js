const express = require('express');
require('./db/sequelize');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();

User.hasMany(Task);
Task.belongsTo(User);

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})

