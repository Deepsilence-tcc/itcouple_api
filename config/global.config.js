/**
 * Created by cong on 2018/4/8.
 */
export default {
    secret: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    mongo: {
        development: {
            connectionString: 'mongodb://127.0.0.1:27017/itcouple'
        },
        production: {
            connectionString: 'mongodb://127.0.0.1:27017/itcouple'
        }
    },
    redis: {
        development: {
            connectionString: 'redis://127.0.0.1:6379'
        },
        production: {
            connectionString: 'redis://127.0.0.1:6379',
        }
    },
}