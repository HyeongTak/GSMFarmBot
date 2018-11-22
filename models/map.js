var mongoose = require('mongoose');

var mapSchema = mongoose.Schema({
    x : Number,
    y : Number,
    plantId : String,
    recentDate : {type: Date, default: Date.now}
});

module.exports = mongoose.model('map', mapSchema);