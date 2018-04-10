/**
 * Created by cong on 2018/4/9.
 */
import proxy from '../proxy/index'
import Log from '../common/log';

class UserController{
    constructor() {
        Object.assign(this, {
            model: proxy.user,
        })

    }

    signIn(req,res,next){
        res.tools.setJson(1,'login operation');
    }
    getInfo(req, res, next) {
        this.model.findByName(req.query.userName)
            .then(doc => {
                console.log(doc);
                if (!doc) return res.tools.setJson(2, '用户不存在或已删除')
                return res.tools.setJson(1, 'success', doc)
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }
}
export default UserController