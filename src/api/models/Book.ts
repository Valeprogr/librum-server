import mongoose,{ Schema} from "mongoose";

export interface IBook {
    title: string;
    author: string;
    description: string;
    genre: string;
    stock: number;
    imageUrl: string;
    price: string;
    email: string;
}

export interface IBookModel extends IBook, Document{}

const BookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required:true},
    genre: {type: String, required: true},
    stock: { type: Number, default: 1 },
    imageUrl: { type: String, default: '' },
    price: { type: String, required: true },
    email: {type: String, required: true}
},{
    timestamps: true,
    versionKey: false
});

export default mongoose.model<IBookModel>('Book', BookSchema)