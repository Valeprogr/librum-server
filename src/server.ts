import { config } from "./api/config/config";
import express from "express";
import http from "http";
import mongoose from "mongoose";

const router = express();

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
    router.use(express.urlencoded({extended: true}));
    router.use(express.json());
    router.use((req,res,next)=>{
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'ORIGIN, X-Requested-Width, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT,POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    //HealthCheck
router.get('/ping', (req,res,next)=>{
    res.status(200).json({message: 'pong'});
})

//Error Handling
router.use((req,res,next)=>{
    const error = new Error('not found');
    return res.status(404).json({message: error.message})
});

http.createServer(router).listen(config.server.port, ()=> console.log(`Server is running on port ${config.server.port}.`))
}
