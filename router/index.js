var express = require('express');
var path = require('path');
var router = express.Router();

var Map = require('../models/map');
var Plant = require('../models/plant');

router.get('/', function(req, res){
    Map.find(function(err, map){
        if (err) return res.status(500).send({ error: 'database failure' });
        var arr = new Array(8);
        for(var i=0;i<8;i++){ arr[i] = new Array(5); }
        for(var i=0;i<map.length;i++){
            arr[map[i].y][map[i].x] = map[i].plantId;
        }
        res.render('index', {
            plantArr: arr
        });
    })
});

router.post('/addMap', function(req,res){
    Plant.find({ name: req.body.plantName }, function(err, plant){
        if (err) return res.status(500).send({ error: 'database failure' });
        var map = new Map;
        map.x = req.body.x;
        map.y = req.body.y;
        map.plantId = plant[0]._id;
        map.save(function (err) {
            if (err) {
                console.error(err);
                return;
            }
        });
    });
    
});

router.post('/setting', function(req, res){
    var plant1 = new Plant();
    plant1.name = "carrot";
    plant1.cycle = 24*60;

    plant1.save(function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("저장1");;
    });

    var plant2 = new Plant();
    plant2.name = "cabbage";
    plant2.cycle = 12*60;

    plant2.save(function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("저장2");;
    });
});

module.exports = router;