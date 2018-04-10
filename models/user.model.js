/**
 * Created by cong on 2018/4/9.
 */
import mongoose from 'mongoose';
import crypto from 'crypto'

//尝试连接的次数
const MAX_LOGIN_ATTEMPTS = 5
//锁定的时间长度
const LOCK_TIME          = 2 * 60 * 60 * 1000

const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    avatar   : String,
    tel      : Number,
    email    : String,
    nickname : String,
    gender   : String,
    birthday : Date,
    loginAttempts: {
        type    : Number,
        required: true,
        default : 0,
    },
    lockUntil: {
        type: Number,
    },
    create_at: {
        type   : Date,
        default: Date.now(),
    },
    update_at: Date,
})
//判断登陆失败的定义
const reasons = UserSchema.statics.failedLogin = {
    NOT_FOUND         : 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS      : 2,
}

// 为UserSchema 定义虚拟的属性isLocked 是否是锁住的状态。为什么用虚拟属性呢？？？？
UserSchema.virtual('isLocked').get(function () {
    return !!(this.lockUntil && this.lockUntil > Date.now())
})
//对比密码
UserSchema.methods.comparePassword = function(candidatePassword) {
    return crypto.createHash('md5').update(candidatePassword).digest('hex') === this.password
}

// UserSchema.methods.incLoginAttempts = function() {
//     // if we have a previous lock that has expired, restart at 1
//     if (this.lockUntil && this.lockUntil < Date.now()) {
//         return this.updateAsync({
//             $set: { loginAttempts: 1 },
//             $unset: { lockUntil: 1 }
//         })
//     }
//     // otherwise we're incrementing
//     const updates = { $inc: { loginAttempts: 1 } }
//     // lock the account if we've reached max attempts and it's not locked already
//     if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
//         updates.$set = { lockUntil: Date.now() + LOCK_TIME }
//     }
//     return this.updateAsync(updates)
// }
// UserSchema.statics.getAuthenticated = function(username, password) {
//     return this.findOneAsync({username: username})
//         .then(doc => {
//             // make sure the user exists
//             if (!doc) {
//                 return reasons.NOT_FOUND
//             }
//             // check if the account is currently locked
//             if (doc.isLocked) {
//                 return doc.incLoginAttempts().then(() => reasons.MAX_ATTEMPTS)
//             }
//             // test for a matching password
//             if (doc.comparePassword(password)) {
//                 // if there's no lock or failed attempts, just return the doc
//                 if (!doc.loginAttempts && !doc.lockUntil) return doc
//                 // reset attempts and lock info
//                 const updates = {
//                     $set: { loginAttempts: 0 },
//                     $unset: { lockUntil: 1 }
//                 }
//                 return doc.updateAsync(updates).then(() => doc)
//             }
//             // password is incorrect, so increment login attempts before responding
//             return doc.incLoginAttempts().then(() => reasons.PASSWORD_INCORRECT)
//         })
// }
//如果表名和model_name 相同， 就不需要添加表名字段即第三个参数， 否则必须要加
export default mongoose.model('user', UserSchema,'User')

