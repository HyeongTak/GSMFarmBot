var express = require('express');
var path = require('path');
var router = express.Router();

var Map = require('../models/map');
var Plant = require('../models/plant');

router.get('/findName', function(req, res){
    Plant.find({_id:req.query.plantId}, function(err, plant){
        res.send(plant[0].name);
    });
});

router.get('/findCycle', function(req, res){
    console.log(plant);
    Plant.find({_id:req.query.plantId}, function(err, plant){
        res.send(plant[0].cycle);
    });
});

module.exports = router;