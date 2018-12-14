var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));

mongoose.connect('mongodb://admin1:admin1@ds229450.mlab.com:29450/farmbot',{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connnected to mongod server");
});

var index = require('./router/index');
app.use('/', index);

var api = require('./router/api');
app.use('/api', api);

app.use('/img',express.static('img'));

var port =  process.env.PORT || 3000;

app.listen(port, function(){
    console.log("Express server has started on port "+ port);
});