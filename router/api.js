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

router.get('/findInfo', function(req, res){
    Plant.find({_id:req.query.plantId}, function(err, plant){
        Map.find({ x: req.query.x, y: req.query.y }, function(err, map){
            var arr = new Array();
            arr.push(plant[0].name);
            arr.push(plant[0].cycle);
            arr.push(map[0].recentDate);
            arr.push(map[0].plantDate);
            res.send(arr);
        });
    });
});

module.exports = router;