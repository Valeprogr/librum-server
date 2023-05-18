"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../controllers/User"));
const router = express_1.default.Router();
router.post('/createUser', User_1.default.createUser);
router.get('/findUser', User_1.default.findUser);
//This function is for check in the backend 
router.get('/all', User_1.default.getAllUsers);
//This are cart Function connected with User
router.get('/cartBooks', User_1.default.findBooks);
router.post('/cartAddBook', User_1.default.addBook);
router.delete('/cartDeleteBook', User_1.default.deleteBook);
module.exports = router;
//# sourceMappingURL=User.js.map