require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require("passport");
const session = require("express-session");
//const fileUpload = require('express-fileupload');





const db = require("./models/index");


db.sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const routes = require('./routes/routes');
const { any } = require('joi');


const server = express();

//server.use(fileUpload());
server.use(cors());
server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));
server.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
}));
server.use(passport.initialize());
server.use(passport.session());
require("./config/passport")(passport);

server.use('/api', routes);

module.exports = server;
