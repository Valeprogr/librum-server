import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Book from '../models/Book';

const createBook = (req: Request, res: Response, next: NextFunction)=>{
    const {title, author, description, genre}= req.body;
    const book= new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        author,
        description,
        genre
    });

    return book
        .save()
        .then((book)=> res.status(201).json({book}))
        .catch((error)=> res.status(500).json({error}))
}

const getBook = (req:Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findById(bookId)
    .then((book)=> (book ? res.status(200).json({book}) : res.status(404).json({message:'Not found'})))
    .catch((error)=>res.status(500).json({error}))
}

const getAllBooks = (req:Request, res: Response, next:NextFunction) =>{
    return Book.find()
}

const editBook = (req: Request, res: Response, next: NextFunction) => {
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
    return Book.findById(bookId)
    .then((book)=> (book ? res.status(201).json({
        message: 'deleted'
    }) : res.status(404).json({
        message: 'Not found'})))
    .catch((error)=> res.status(500).json({error}))
};

export default {createBook, 
                getBook, 
                getAllBooks,
                editBook, 
                deleteBook};