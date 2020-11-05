import mongoose, { Schema, Document } from 'mongoose';
import { UserT } from '../models/User';

export interface IUser extends Document, UserT {}

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    name: {
        type: String, 
        required: true,
        minlength: 3,
    },
    password: {
        type: String, 
        minlength: 6,
        required: true
    }
});

export default mongoose.model<IUser>('User', UserSchema);