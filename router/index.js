var express = require('express');
var path = require('path');
var router = express.Router();

var Map = require('../models/map');
var Plant = require('../models/plant');

router.get('/', function(req, res){
    var arr = new Array(8);
    for(var i=0;i<8;i++){ arr[i] = new Array(5); }
    arr[1][2] = "carrot";
    arr[4][3] = "cabbage";
    res.render('index', {
        plantArr: arr
    });
});

router.post('/addMap', function(req,res){
    var arr = new Array();
    for(var i=0;i<8;i++){
        for(var j=0;j<5;j++){
            if(req.body.plantArr[i][j]){
                var map = new Map;
                map.x = i;
                map.y = j;
                map.plantId = req.body.plantArr[i][j]
                arr.push(map);
            }
        }
    }

    for(var i=0; i<arr.length; i++){
        Plant.find({ name: arr[i].plantId }, function(err, plant){
            if (err) return res.status(500).send({ error: 'database failure' });
            arr[i].plantId = plant[0]._id;
            arr[i].save(function (err) {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log("map저장");
            });
        });
    }
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