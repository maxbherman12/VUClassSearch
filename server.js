const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const app = express();

dotenv.config();
mongoose.connect(process.env.MONGO_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => { console.log("Successfully connected to Mongo DB")})
    .catch(err => { console.log (`Database error: ${err}`)})

//use built in body parser
app.use(express.json());

//use routes
const usersRoutes = require('./routes/users.routes');
app.use('/api/users', usersRoutes);
const coursesRoutes = require('./routes/courses.routes');
app.use('/api/courses', coursesRoutes);

//set port and listen
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));