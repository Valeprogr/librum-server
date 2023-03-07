import Joi,{ObjectSchema} from "joi";
import { NextFunction,Response,Request } from "express";
import { IBook } from "../models/Book";

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction)=>{
        try{
            await schema.validateAsync(req.body);
        }catch(error){
            return res.status(422).json({error})
        }
    };
};

export const Schema = {
    book:{
        create: Joi.object<IBook>({
            title: Joi.string(),
            author: Joi.string(),
            description: Joi.string(),
            genre: Joi.string()
        })
    }
}