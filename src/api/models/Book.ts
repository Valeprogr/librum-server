import mongoose,{ Schema} from "mongoose";

export interface IBook {
    title: string;
    author: string;
    description: string;
    genre: string;
    stock: number;
    imageUrl: string;
}

export interface IBookModel extends IBook, Document{}

const BookSchema = new Schema({
    title: {type: String},
    author: {type: String},
    description: {type: String},
    genre: {type: String},
    stock: { type: Number, default: 1 },
    imageUrl: {type: String, default: ""}
},{
    timestamps: true,
    versionKey: false
});

export default mongoose.model<IBookModel>('Book', BookSchema)