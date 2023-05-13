
import express from "express";
import { Schema } from "mongoose";
import controllers from "../controllers/User";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";
import { route } from "./Book";

const router = express.Router();
router.post('/createUser', controllers.createUser);
router.get('/findUser', controllers.findUser);
//This function is for check in the backend 
router.get('/all', controllers.getAllUsers);
//This are cart Function connected with User
router.get('/cartBooks', controllers.findBooks);
router.post('/cartAddBook', controllers.addBook);

export = router;