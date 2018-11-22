var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res){
    var arr = new Array(10);
    for(var i=0;i<10;i++){
        arr[i] = new Array(10);
    }
    arr[3][5] = "carrot";
    arr[7][8] = "cabbage";
    res.render('index', {
        plantArr: arr
    });
});

module.exports = router;