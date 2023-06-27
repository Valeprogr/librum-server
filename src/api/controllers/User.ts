import { NextFunction,Request,Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email) {
        return res.status(500).json({ message: "no req body" });
    }
    console.log(req.body.email)
    const user = await User.findOne({email: req.body.email})
    if (user) {
       return res.status(403).json({message: 'This account already exist!'})
    } else {
        const email = req.body.email;
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email
        })
        return user
            .save()
            .then((user) => res.status(201).json({ user }))
            .catch((error)=>res.status(500).json({error}))
    }
    
}

const findUser = (req: Request, res: Response, next: NextFunction) => {
    const userEmail = req.body.email;

    return User.findOne({email: userEmail})
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
}

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
}
//Cart Book Functions 
const findBooks = (req: Request, res: Response, next: NextFunction) => {
    const userEmail = req.body.email;
    console.log(userEmail)
    return User.find({ email: userEmail })
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(500).json({ error }));
}

const addBook = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        return res.status(500).json({ message: "no req body" });
    } 
    const email = req.body.email;
    const books = req.body.books;
    
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email,
            books
        })
    return user
            .save()
            .then((user) => res.status(201).json({ user }))
            .catch((error)=>res.status(500).json({error}))
    

}

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        return res.status(500).json({ message: "no req body" });
    } 
    const book = req.body.books;
    console.log(book)

    return User.findOneAndDelete({books: book })
    .then((book)=> (book ? res.status(201).json({
        message: 'deleted'
    }) : res.status(404).json({
        message: 'Not found'})))
    .catch((error)=> res.status(500).json({error}))

}
export default {createUser, findUser, getAllUsers, findBooks,addBook, deleteBook}