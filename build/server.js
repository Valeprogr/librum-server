"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./api/config/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Book_1 = __importDefault(require("./api/routes/Book"));
const User_1 = __importDefault(require("./api/routes/User"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//Connection with Mongo
mongoose_1.default.connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    console.log('Connect to mongo');
    StartServer();
})
    .catch((error) => {
    console.log(error);
});
//Start Server
const StartServer = () => {
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'ORIGIN, X-Requested-Width, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT,POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    //Routes
    app.use('/books', Book_1.default);
    app.use('/user', User_1.default);
    //HealthCheck
    app.get('/ping', (req, res, next) => {
        res.status(200).json({ message: 'pong' });
    });
    app.get('/', (req, res) => {
        return res.send('Express Typescript on Vercel');
    });
    //Error Handling
    app.use((req, res, next) => {
        const error = new Error('not found');
        return res.status(404).json({ message: error.message });
    });
    app.listen(config_1.config.server.port, () => console.log(`Server is running on port ${config_1.config.server.port}.`));
};
//# sourceMappingURL=server.js.map