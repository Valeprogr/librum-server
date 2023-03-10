import mongoose,{Schema} from "mongoose";
export interface IUser{
    email: string;
    books: string[];
}

export interface IUserModel extends IUser, Document{}

const UserSchema = new Schema({
    email: { type: String, require: true },
    books: [{type: mongoose.Schema.Types.ObjectId, ref:'Book'}]
});

export default mongoose.model<IUserModel>('User', UserSchema)