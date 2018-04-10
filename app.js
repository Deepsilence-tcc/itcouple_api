import express from 'express';
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

import domain from 'domain'
import Log from './common/log';
import config from './config/global.config';
import Mongo from './db/db.mongo';


/********************custom middlewares**********************/
import toolMiddleware  from './middlewares/tool.middleware';
import domainMiddleware from './middlewares/domain.middleware';
import httpLoggerMiddleware from './middlewares/log.middleware';

/***********************custom routers****************************************/
import Router from './routes/index'

var app = express();
Log.use(app);
const mongodb  = new Mongo(app, config)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.secret));
app.use(express.static(path.join(__dirname, 'public')));

app.use(toolMiddleware);
app.use(httpLoggerMiddleware);

/******************************路由分发模块****************************************/
Router(app);

/*************************错误处理模块*********************************/
// error handler
app.use(function(err, req, res, next) {
    Log.logger.error(err);
   res.tools.setJson(0,'服务器错误',null)
});

process.on('uncaughtException', function (err) {
    Log.logger.error(err);
});
app.use(function (req,res,next) {
    var d = domain.create();
    //监听domain的错误事件
    d.on('error', function (err) {
        res.statusCode = 500;
        Log.logger.error(err);
        res.tools.setJson(0,'服务器错误',null)
        d.dispose();
    });

    d.add(req);
    d.add(res);
    d.run(next);
});


module.exports = app;
