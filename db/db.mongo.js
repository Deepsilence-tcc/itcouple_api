/**
 * Created by cong on 2018/4/9.
 */
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import Log from '../common/log'
// 连接mongo 服务器

class Mongo{
    constructor(app,config){
        Object.assign(this,{
            app,
            config
        });
        this.init();
    }
    init(){
        this.env    = this.app.get('env')
        this.dblink = this.config['mongo'][this.env]['connectionString']
        const opts = {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
        mongoose.connect(this.dblink)
        mongoose.Promise = bluebird;
        bluebird.promisifyAll(mongoose);

        // 这段代码的意思是通过mongoose 所有的异步操作都同步化
        // mongoomise.promisifyAll(mongoose, bluebird)
    }
}

export default Mongo