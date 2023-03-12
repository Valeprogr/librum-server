import { config } from "./api/config/config";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import bookRoutes from "./api/routes/Book";
import userRoutes from "./api/routes/User";
import cors from "cors";

const app = express();
app.use(cors());

//Connection with Mongo

mongoose.connect(config.mongo.url, {retryWrites: true, w: "majority"})
.then(()=>{
    console.log('Connect to mongo');
    StartServer();
})
.catch((error)=>{
    console.log(error)
})

//Start Server
const StartServer = () =>{
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use((req,res,next)=>{
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'ORIGIN, X-Requested-Width, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT,POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    
    //Routes
    app.use('/books', bookRoutes);
    app.use('/user', userRoutes);

    //HealthCheck
    app.get('/ping', (req,res,next)=>{
        res.status(200).json({message: 'pong'});
    })

    //Error Handling
    app.use((req,res,next)=>{
        const error = new Error('not found');
        return res.status(404).json({message: error.message})
    });

    app.listen(config.server.port, ()=> console.log(`Server is running on port ${config.server.port}.`))
}

