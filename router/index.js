var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res){
    var arr = new Array(10);
    for(var i=0;i<10;i++){
        arr[i] = new Array(10);
    }
    res.render('index');
});

module.exports = router;