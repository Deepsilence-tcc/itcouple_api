/**
 * Created by cong on 2018/4/9.
 */
import UserController from '../controller/user.controller';

class UserRouter{
    constructor(router){
        Object.assign(this,{
            router,
            userController:new UserController()
        })
        this.init();
    }
    init(){
        this.router.get('/vi/api/user/login',this.userController.signIn)
    }

}

export default UserRouter