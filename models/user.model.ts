//Define our about us schema
import * as mongoose from 'mongoose'
import { USER_ROLES } from '../configuration/app.constant';

export interface UserDocument extends mongoose.Document {
    _id: string;
    fullName?: string;
    password?: string;
    email?: string;
    role?: string;
    isActive?: Boolean;
    createdAt?: Date;
}

const UserSchema = new mongoose.Schema({
    fullName: { type: String },
    password: { type: String },
    email: { type: String, unique: true, default: '' },
    role: {
        type: String,
        enum: [USER_ROLES.USER, USER_ROLES.ADMIN],
        default: USER_ROLES.USER
    },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: new Date() },
});

export const UserModel: mongoose.Model<UserDocument> =
    mongoose.model<UserDocument>('users', UserSchema, 'users');

export async function userDetails(id: string, projection: Object): Promise<UserDocument> {
    return await UserModel.findById({ _id: mongoose.Types.ObjectId(id) }, projection)
}
