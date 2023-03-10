import { NextFunction,Request,Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const { email, books } = req.body;
    if (email === User.findOne({email})) {
       return res.status(403).json({message: 'This account already exist!'})
    } else {
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
    
}

const findUser = (req: Request, res: Response, next: NextFunction) => {
    
}