const mongoose = require('mongoose');
const uuid = require('uuid');

const courseScheme = new mongoose.Schema({
    _id:{type: String, default: uuid.v4()},
    title: {type:  String, required: true},
    description: {type:  String, required: true},
    price: {type:  Number, required: true},
    image: { type: String}
})

const Course = mongoose.model("Course", courseScheme)

module.exports = Course;