var mongoose = require('mongoose');

var plantSchema = mongoose.Schema({
    name : String,
    cycle : Number
});

module.exports = mongoose.model('plant', plantSchema);