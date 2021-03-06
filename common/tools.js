/**
 * Created by cong on 2018/4/8.
 */
class Tools {
    constructor(req,res){
        Object.assign(this, {
            req,
            res,
        })
    }
    setJson(code, message, data) {
        return this.res.json({
            code: code || 0,
            message: message || null,
            data: data || null
        })
    }
}

export default Tools;