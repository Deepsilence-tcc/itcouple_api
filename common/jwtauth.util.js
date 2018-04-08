/**
 * Created by cong on 2018/4/8.
 */
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import config from '../config/global.config'

export default {
    TOKEN_SECRET: config.secret,
    setToken(id) {
        return jwt.sign({
            id: id
        }, this.TOKEN_SECRET, {
            expiresIn: 60 * 60
        })
    },
    //MD5 加密
    setMd5(value) {
        return crypto.createHash('md5').update(value).digest('hex')
    }
}