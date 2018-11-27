var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
    time : {type: Date, default: Date.now},
    act : String
});

module.exports = mongoose.model('log', logSchema);