/**
 * Created by cong on 2018/4/9.
 */
import proxy from '../proxy'

class UserController{
    constructor() {
        Object.assign(this, {
            model: proxy.user,
        })

    }
    signIn(req,res,next){
        res.tools.setJson(0,'登陆');
    }
}

export default UserController