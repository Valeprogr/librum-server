import express,{Express,Request,Response} from "express";
import dotenv from "dotenv";
dotenv.config(); 


const PORT= process.env.PORT;
const app: Express= express();

app.get("/",(req:Request, res: Response)=>{
    res.send('Express + Typescript Server');
})
async function startApp(){
    app.listen(PORT, ()=>{
        console.log(`[server]: Server started on port ${PORT}`)
    })
}

startApp()