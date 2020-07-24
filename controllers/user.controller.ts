import { Request, Response, NextFunction } from 'express';
import { UserModel, UserDocument } from '../models/user.model';
import * as mongoose from 'mongoose';
import { UtillServices } from '../utill.service';


const utillServices: UtillServices = new UtillServices();

export class UserController {
    constructor() {
        console.log('User Controller called');
    }

    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            let userModel: UserDocument = req.body;
            userModel = await UserModel.findOne({
                email: userModel.email
            }).exec()
            if (utillServices.decodeBase64(userModel.password) === utillServices.decodeBase64(userModel.password)) {
                res.status(200).send(userModel);
            } else {
                res.status(404).send({ message: 'invalid credential!' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        const id: string = String(req.query.id);
        try {
            const userModel: UserDocument = await UserModel.findById({ _id: mongoose.Types.ObjectId(id) })
            res.status(200).send(userModel);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

    async getUserList(req: Request, res: Response, next: NextFunction) {
        const page: Number = Number(req.query.page) ? Number(req.query.page) : 1;
        const limit: Number = Number(req.query.limit) ? Number(req.query.limit) : 30;
        try {
            const userModel: UserDocument[] = await UserModel.find({})
                .skip(Number(limit) * (Number(page) - 1))
                .limit(Number(limit)).exec();
            res.status(200).send(userModel);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            let userModel: UserDocument = req.body;
            userModel.password = utillServices.encodeBase64(userModel.password)
            userModel = new UserModel(userModel);
            userModel = await userModel.save()
            res.status(200).send(userModel);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            let userModel: UserDocument = req.body;
            userModel = await UserModel.findByIdAndUpdate({ _id: userModel._id }, userModel).exec();
            res.status(200).send(userModel);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

}