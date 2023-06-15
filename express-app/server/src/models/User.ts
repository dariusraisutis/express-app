import { Schema, model } from "mongoose";

export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export const instanceOfUser = (object: any): object is IUser => {
    return 'firstName' in object;
}

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
});

export const User = model<IUser>('User', userSchema);