/**
 * Created by cong on 2018/4/8.
 */
import config from '../config/global.config'
import redis from 'redis'

const redisLink = config['redis'][process.env.NODE_ENV || 'development']['connectionString']
const redisClient = redis.createClient(redisLink)

redisClient
    .on('error', err => console.log('------ Redis connection failed ------' + err))
    .on('connect', () => console.log('------ Redis connection succeed ------'))

export default {
    redis: redis,
    redisClient: redisClient,
}