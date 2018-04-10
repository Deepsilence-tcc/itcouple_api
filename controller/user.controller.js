/**
 * Created by cong on 2018/4/9.
 */
import proxy from '../proxy/index'
import Log from '../common/log';
import jwtauth from '../middlewares/jwauth.middleware'

class UserController{
    constructor() {
        Object.assign(this, {
            model: proxy.user,
        })

    }

    signUp(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        if (!username || !password) return res.tools.setJson(1, '用户名或密码错误不能为空')
        this.model.findByName(username)
            .then(doc => {
                if (!doc) return this.model.newAndSave({
                    username: username,
                    password: res.jwt.setMd5(password)
                })
                return res.tools.setJson(1, '用户名已存在')
            })
            .then(doc => res.tools.setJson(0, '注册成功'))
            .catch(err => next(err))
    }

    signIn(req,res,next){
        const username = req.body.username
        const password = req.body.password
        if (!username || !password) return res.tools.setJson(1, '用户名或密码错误');

        this.model.model.getAuthenticated(username, password)
            .then(doc => {
                switch (doc) {
                    case 0:
                        res.tools.setJson(1, '用户名或密码错误')
                        break
                    case 1:
                        res.tools.setJson(1, '用户名或密码错误')
                        break
                    case 2:
                        res.tools.setJson(1, '账号已被锁定，请等待两小时解锁后重新尝试登录')
                        break
                    default: res.tools.setJson(0, '登录成功', {
                        token: res.jwt.setToken(doc._id)
                    })
                }
            })
            .catch(err => next(err))

    }

    signOut(req, res, next) {
        if (req.user) {
            new jwtauth().expireToken(req.headers)
            delete req.user
            delete this.app.locals.token
            return res.tools.setJson(0, '登出成功')
        }
        return res.tools.setJson(1, '登出失败')
    }

    /**
     * @api {get} /api/user/info 获取用户信息
     * @apiDescription 获取用户信息
     * @apiVersion 1.0.0
     * @apiName getInfo
     * @apiGroup user
     * @apiParam {username}  username type string
     * @apiPermission none
     * @apiSampleRequest /api/user/info
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
	 *
	 *       "code": 0,
	 *       "message": "success",
	 *       "data": {
	 *          "_id" : ObjectId("5acad52b35c346f6c2d4448b"),
     *          "username" : "tcc",
     *          "password" : "tcc0228",
     *          "avatar" : "String",
     *          "tel" : 123,
     *          "email" : "49@qq.com",
     *          "nickname" : "bily",
     *          "gender" : "男",
     *          "birthday" : NumberLong(1523242283381),
     *          "loginAttempts" : 0,
     *          "lockUntil" : 2000,
     *          "create_at" : NumberLong(1523242283381),
     *          "update_at" : NumberLong(1523242283381)
	 *       }
	 *     }
     *
     */
    getInfo(req, res, next) {
        this.model.findByName(req.param.userName)
            .then(doc => {
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