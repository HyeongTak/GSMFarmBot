var mongoose = require('mongoose');

var measureSchema = mongoose.Schema({
    currentTime : Date,
    humidity : Number,
    temperature : Number
});

module.exports = mongoose.model('measure', measureSchema);