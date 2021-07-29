const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {User, UserSchema} = require('./user.model');

const CourseSchema = new Schema({
    department: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    students : {
        type: [UserSchema],
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    monday: {
        type: Boolean,
        required: true
    },
    tuesday: {
        type: Boolean,
        required: true
    },
    wednesday: {
        type: Boolean,
        required: true
    },
    thursday: {
        type: Boolean,
        required: true
    },
    friday: {
        type: Boolean,
        required: true
    },
    saturday: {
        type: Boolean,
        required: true
    },
    sunday: {
        type: Boolean,
        required: true
    },
    lab : {
        type: Boolean,
        default: false
    },
    firstHalfMod : {
        type: Boolean,
        default: false
    },
    secondHalfMod : {
        type: Boolean,
        default: false
    },
    groupme: {
        id: String,
        share_url: String
    }
});

module.exports = CourseSchema;
module.exports = Course = mongoose.model('course', CourseSchema);