
import express from "express";
import { Schema } from "mongoose";
import controllers from "../controllers/User";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();
router.post('/create', ValidateSchema(Schemas.user.create), controllers.createUser);
router.get('/get/:userId', controllers.findUser);
//This function is for check in the backend 
router.get('/all', controllers.getAllUsers);
export = router;