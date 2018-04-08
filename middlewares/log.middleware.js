/**
 * Created by cong on 2018/4/8.
 */
import {httpLogger} from '../common/log';
module.exports = function (req,res,next) {
    httpLogger.info('当前正在访问的接口'+req.baseUrl);
    // 通过这个中间件也可以将日志存库
    next();
}