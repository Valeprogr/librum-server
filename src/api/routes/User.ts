
import express from "express";
import { Schema } from "mongoose";
import controllers from "../controllers/User";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";
import { route } from "./Book";

const router = express.Router();
router.post('/create', controllers.createUser);
router.get('/get/:userId', controllers.findUser);
//This function is for check in the backend 
router.get('/all', controllers.getAllUsers);
//This are cart Function connected with User
router.get('/cart', controllers.findBooks);
router.post('/cart', controllers.addBook);

export = router;