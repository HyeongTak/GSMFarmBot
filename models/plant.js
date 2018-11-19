var mongoose = require('mongoose');

var plantSchema = mongoose.Schema({
    name : String,
    cycle : Number,
    date : {type: Date, default: Date.now}
});

module.exports = mongoose.model('plant', plantSchema);