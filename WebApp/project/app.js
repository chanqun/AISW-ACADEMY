var express = require('express');
var app = express();
var engines = require('consolidate');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// router 설정
var router = require('./routes/index')(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view 경로 설정
//app.set('views', __dirname + '/views');

// 화면 engine을 html로 설정
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// 기본 path를 /public으로 설정(css, javascript 등의 파일 사용을 위해)
//app.use('/img', express.static(path.join(__dirname + 'views/img')));

app.use('/', express.static(__dirname + '/views'));
app.use('/img', express.static(__dirname + '/views/img'));

var server = app.listen(3444,function(){
    console.log("Express server has started on port 3444")
});

module.exports = app;
