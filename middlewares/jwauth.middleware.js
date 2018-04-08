/**
 * Created by cong on 2018/4/8.
 */
import redis from '../db/db.redis';

class RedisMiddleware{
    constructor(){
        this.redisClient = redis.redisClient;
        this.TOKEN_EXPIRATION     = 60
        this.TOKEN_EXPIRATION_SEC = this.TOKEN_EXPIRATION * 60
    }

    /**
     * 获取头部的token
     */
    getToken(headers){
        if (headers && headers.authorization) {
            const authorization = headers.authorization
            const part = authorization.split(' ')

            if (part.length == 2) {
                return part[1]
            }
        }

        return null
    }
    /**
     * Middleware for token verification
     */
    verifyToken(req, res, next) {
        const token = this.getToken(req.headers)
        this.redisClient.get(token, (err, reply) => {
            if (err) return res.tools.setJson(500, '服务器错误')
            if (reply) return res.tools.setJson(401, '无权访问')
        });
    }
    /**
     * redis set key,让token 过期
     */
    expireToken(headers) {
        const token = this.getToken(headers)

        if (token != null) {
            this.redisClient.set(token, true)
            this.redisClient.expire(token, this.TOKEN_EXPIRATION_SEC)
        }
    }
}
export default RedisMiddleware;