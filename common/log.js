/**
 * Created by cong on 2018/4/8.
 */
var log4js = require('log4js');
var logConfig = require('./log4js.json');

log4js.configure(logConfig);

var defaultFileLog = log4js.getLogger();
var httpLog = log4js.getLogger('http');

exports.logger = defaultFileLog;
exports.httpLogger = httpLog;

exports.use = function(app){
    app.use(log4js.connectLogger(defaultFileLog, {level:'auto', format:':method :url'}));
    app.use(log4js.connectLogger(httpLog, {level:'auto', format:':method :url'}));
}
