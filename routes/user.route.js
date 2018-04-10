/**
 * Created by cong on 2018/4/9.
 */
import UserController from '../controller/user.controller';

class UserRouter{
    constructor(router){
        Object.assign(this,{
            router,
        })
        this.init();
    }
    init(){
       //   如果以这样的方式去改变上下文的方式， 那么在这个方法指向的this，是指向该Router
        // this.router.get('/v1/api/user/login',this.userController.signIn);

        let userController=new UserController()
        this.router.get('/v1/api/user/info',userController.getInfo.bind(userController));

        this.router.get('/v1/api/user/login',userController.signIn.bind(userController));
    }

}

export default UserRouter