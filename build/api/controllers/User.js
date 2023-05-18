"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return res.status(500).json({ message: "no req body" });
    }
    console.log(req.body.email);
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.status(403).json({ message: 'This account already exist!' });
    }
    else {
        const email = req.body.email;
        const user = new User_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            email
        });
        return user
            .save()
            .then((user) => res.status(201).json({ user }))
            .catch((error) => res.status(500).json({ error }));
    }
});
const findUser = (req, res, next) => {
    const userEmail = req.body.email;
    return User_1.default.findOne({ email: userEmail })
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const getAllUsers = (req, res, next) => {
    return User_1.default.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
};
//Cart Book Functions 
const findBooks = (req, res, next) => {
    const userEmail = req.body.email;
    console.log(userEmail);
    return User_1.default.find({ email: userEmail })
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
};
const addBook = (req, res, next) => {
    if (!req.body) {
        return res.status(500).json({ message: "no req body" });
    }
    const email = req.body.email;
    const books = req.body.books;
    const user = new User_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        email,
        books
    });
    return user
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};
const deleteBook = (req, res, next) => {
    if (!req.body) {
        return res.status(500).json({ message: "no req body" });
    }
    const book = req.body.books;
    console.log(book);
    return User_1.default.findOneAndDelete({ books: book })
        .then((book) => (book ? res.status(201).json({
        message: 'deleted'
    }) : res.status(404).json({
        message: 'Not found'
    })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createUser, findUser, getAllUsers, findBooks, addBook, deleteBook };
//# sourceMappingURL=User.js.map