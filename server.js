const express = require('express');
const mongoose = require('mongoose');

const app = express();

//use built in body parser
app.use(express.json());

//use routes
const usersRoutes = require('./routes/users.routes');
app.use('/api/users', usersRoutes);

//set port and listen
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));