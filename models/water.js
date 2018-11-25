var mongoose = require('mongoose');

var waterSchema = mongoose.Schema({
    x : Number,
    y : Number
});

module.exports = mongoose.model('water', waterSchema);