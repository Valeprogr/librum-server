import express from "express";
import controller from "../controllers/Book"


const router = express.Router();

router.post('/addBook',controller.createBook);
router.get('/book/:bookId', controller.getBook);
router.get('/listOfBooks', controller.getAllBooks);
router.patch('/editBook/:bookId',controller.updateBook);
router.delete('/deleteBook/:bookId',controller.deleteBook);

export = router;