import express from "express";
import controller from "../controllers/Book"
import { Schemas, ValidateSchema} from "../middleware/ValidateSchema";

const router = express.Router();

router.post('/create',ValidateSchema(Schemas.book.create),controller.createBook);
router.get('/get/:bookId', controller.getBook);
router.get('/get/', controller.getAllBooks);
router.patch('/update/:bookId', ValidateSchema(Schemas.book.update),controller.updateBook);