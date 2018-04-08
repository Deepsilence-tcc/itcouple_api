/**
 * Created by cong on 2018/4/8.
 */
import Tools from '../common/tools';

module.exports = function (req,res,next) {
    let tools = new Tools(req,res);
    res.tools = tools
    next();
}
