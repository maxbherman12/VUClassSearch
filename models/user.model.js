const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = require('./course.model');

const UserSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    // email: {
    //     type: String,
    //     unique: true,
    //     required: true,
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    // schedule: {
    //     type: [Course],
    //     required: true
    // },
    dateReg: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);