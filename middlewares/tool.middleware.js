/**
 * Created by cong on 2018/4/8.
 */
import Tools from '../common/tools';
import jwt from '../common/jwtauth.util';

module.exports = function (req,res,next) {
    let tools = new Tools(req,res);
    res.tools = tools
    res.jwt = jwt
    next();
}
