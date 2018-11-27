var express = require('express');
var path = require('path');
var router = express.Router();

var Map = require('../models/map');
var Plant = require('../models/plant');
var Water = require('../models/water');
var Measure = require('../models/measure');
var Log = require('../models/log');

router.get('/', function(req, res){
    Map.find(function(err, map){
        if (err) return res.status(500).send({ error: 'database failure' });
        var arr = new Array(8);
        for(var i=0;i<8;i++){ arr[i] = new Array(5); }
        for(var i=0;i<map.length;i++){
            arr[map[i].y][map[i].x] = map[i].plantId;
        }
        Measure.find(function(err, m){
            if (err) return res.status(500).send({ error: 'database failure' });
            Log.find(function(err, log){
                res.render('index', {
                    plantArr: arr,
                    Measure: m[0],
                    Log: log
                });
            });
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

router.post('/addLog', function(req, res){
    var log = new Log();
    log.act = req.body.act;
    log.save(function (err) {
        if (err) {
            console.error(err);
            return;
        }
        res.send('성공');
    });
})

router.post('/water', function(req, res){
    console.log('물');
    water = new Water();
    water.x = req.body.x;
    water.y = req.body.y;
    water.save(function (err) {
        if (err) {
            console.error(err);
            return;
        }
    });
});

router.post('/updateMap', function(req, res){
    Map.find({ x: req.body.x, y:req.body.y }, function(err, plant){
        if (err) return res.status(500).send({ error: 'database failure' });
        plant[0].recentDate = Date.now();
        plant[0].save(function (err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("map업데이트");
        });
    });
});

router.post('/delete', function(req,res){
    Map.remove({ x: req.body.x, y:req.body.y }, function(err, plant){
        if (err) return res.status(500).send({ error: 'database failure' });
        console.log('삭제');
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
        console.log("저장1");
    });

    var plant2 = new Plant();
    plant2.name = "cabbage";
    plant2.cycle = 12*60;

    plant2.save(function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("저장2");
    });
});

module.exports = router;