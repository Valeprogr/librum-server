"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Book_1 = __importDefault(require("../controllers/Book"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
router.post('/addBook', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.book.create), Book_1.default.createBook);
router.get('/book/:bookId', Book_1.default.getBook);
router.get('/listOfBooks', Book_1.default.getAllBooks);
router.patch('/editBook/:bookId', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.book.update), Book_1.default.updateBook);
router.delete('/deleteBook/:bookId', Book_1.default.deleteBook);
module.exports = router;
//# sourceMappingURL=Book.js.map