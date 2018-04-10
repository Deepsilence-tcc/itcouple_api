/**
 * Created by cong on 2018/4/9.
 */
import express from 'express';
import UserRouter from './user.route';

let router = express.Router();

export default function (app) {
    new UserRouter(router);
    app.use(router);
}
