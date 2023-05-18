import express from "express";
import controller from "../controllers/Book"
import { Schemas, ValidateSchema} from "../middleware/ValidateSchema";

const router = express.Router();

router.post('/addBook',ValidateSchema(Schemas.book.create),controller.createBook);
router.get('/book/:bookId', controller.getBook);
router.get('/listOfBooks', controller.getAllBooks);
router.patch('/editBook/:bookId', ValidateSchema(Schemas.book.update),controller.updateBook);
router.delete('/deleteBook/:bookId',controller.deleteBook);

export = router;