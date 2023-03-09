import mongoose,{Schema} from "mongoose";
export interface IUser{
    name: string;
    lastname: string;
    password: string;
}

export interface IUserModel extends IUser, Document{}

const UserSchema = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true}
});

export default mongoose.model<IUserModel>('User', UserSchema)