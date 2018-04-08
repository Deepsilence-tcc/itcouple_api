import express from 'express';
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

import Log from './common/log';


/********************custom middlewares**********************/
import toolMiddleware  from './middlewares/tool.middleware';
import domainMiddleware from './middlewares/domain.middleware';
import httoLoggerMiddleware from './middlewares/log.middleware';

/***********************custom routers****************************************/

var app = express();
Log.use(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(toolMiddleware);
app.use(domainMiddleware);
app.use(httoLoggerMiddleware);

app.use('/',function (req,res,next) {
    next();
});
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
   res.tools.setJson(0,'服务器错误',null)
});

process.on('uncaughtException', function (err) {
    Log.logger.error(err);
});

module.exports = app;
