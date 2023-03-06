import mongoose,{Document, Schema} from "mongoose";

export interface IBook {
    title: string;
    author: string;
    description: string;
    genre: string;
}

export interface IBookModel extends IBook, Document{}

const BookSchema = new Schema({
    title: {type: String, required: true},
    author: {String, required: true},
    description: {String, required:true},
    genre: {String, required: true}
},{
    timestamps: true
})

export default mongoose.model<IBookModel>('Book', BookSchema)