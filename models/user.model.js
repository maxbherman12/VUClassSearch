const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {Course, CourseSchema} = require('./course.model');

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    schedule: {
        type: [CourseSchema],
        required: false
    },
    dateReg: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);