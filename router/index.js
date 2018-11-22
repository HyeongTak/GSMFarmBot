var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res){
    var arr = new Array(8);
    for(var i=0;i<8;i++){
        arr[i] = new Array(5);
    }
    arr[1][2] = "carrot";
    arr[4][3] = "cabbage";
    res.render('index', {
        plantArr: arr
    });
});

router.post('/addPlant', function(req,res){
            console.log(req.body.plantArr);
      
});

module.exports = router;