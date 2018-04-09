/**
 * Created by cong on 2018/4/9.
 */
import express from 'express';
import UserRouter from './user.route';

let router = express.Router();

exports.use = function (app) {
    let userRouter = new UserRouter(router);
    app.use('/user',userRouter);
}
