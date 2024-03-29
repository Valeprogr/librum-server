import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Book from '../models/Book';

const createBook = (req: Request, res: Response, next: NextFunction)=>{
    const { description, genre, stock, imageUrl, price, email } = req.body;
    const title = (req.body.title).toLowerCase();
    const author = (req.body.author).toLowerCase();
    const book= new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        author,
        description,
        genre,
        stock,
        imageUrl,
        price,
        email
    });

    return book
        .save()
        .then((book)=> res.status(201).json({book}))
        .catch((error)=> res.status(500).json({error}))
};

const getBook = (req:Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findById(bookId)
    .then((book)=> (book ? res.status(200).json({book}) : res.status(404).json({message:'Not found'})))
    .catch((error)=>res.status(500).json({error}))
}

const getAllBooks = (req:Request, res: Response, next:NextFunction) =>{
    return Book.find()
    .then((books) => res.status(200).json({ books }))
    .catch((error) => res.status(500).json({ error }));
}

const updateBook = (req: Request, res: Response, next: NextFunction) => {
const bookId = req.params.bookId;

return Book.findById(bookId).then((book)=>{
    if(book){
        book.set(req.body);
        return book
            .save()
            .then((book)=> res.status(201).json({book}))
            .catch((error)=> res.status(500).json({error}));
    }else{
        return res.status(404).json({message: 'Not found'});
    }
});
};

const deleteBook = (req:Request, res: Response, next:NextFunction) =>{
    const bookId= req.params.bookId;
    return Book.findByIdAndDelete(bookId)
    .then((book)=> (book ? res.status(201).json({
        message: 'deleted'
    }) : res.status(404).json({
        message: 'Not found'})))
    .catch((error)=> res.status(500).json({error}))
};

export default {createBook, 
                getBook, 
                getAllBooks,
                updateBook, 
                deleteBook};