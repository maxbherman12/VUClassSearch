const express       = require('express');
const mongoose      = require('mongoose');
const dotenv        = require('dotenv');
const cors          = require('cors');
const session       = require("express-session");
const passport      = require("passport");
const cookieParser  = require('cookie-parser')
const path          = require('path')
const getBaseUrl    = require('./middleware/getBaseUrl')

const app = express();

dotenv.config();

app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => { console.log("Successfully connected to Mongo DB")})
    .catch(err => { console.log (`Database error: ${err}`)})

mongoose.set('returnOriginal', false)

//use built in body parser
app.use(express.json());

app.use(cookieParser())

//allow cross origin resource sharing
app.use(cors({credentials: true, origin: `${getBaseUrl()}`}))

//use routes
const authRoutes        = require('./routes/auth.routes')
const usersRoutes       = require('./routes/users.routes');
const coursesRoutes     = require('./routes/courses.routes');

app.use('/auth', authRoutes)
app.use('/api/users', usersRoutes);
app.use('/api/courses', coursesRoutes);

//Serve static assets if in production
if(process.env.NODE_ENV === "production")
{
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

//set port and listen
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));