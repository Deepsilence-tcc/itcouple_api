/**
 * Created by cong on 2018/4/8.
 */
import domain from 'domain';
import Log from '../common/log'
module.exports = function (req,res,next) {
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
}