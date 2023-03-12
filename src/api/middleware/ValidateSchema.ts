import Joi,{ObjectSchema} from "joi";
import { NextFunction,Response,Request } from "express";
import { IBook } from "../models/Book";
import { IUser } from "../models/User";

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction)=>{
        try{
            await schema.validateAsync(req.body);

            next();
        }catch(error){
            return res.status(422).json({error})
        }
    };
};

export const Schemas = {
    book:{
        create: Joi.object<IBook>({
            title: Joi.string().required(),
            author: Joi.string().required(),
            description: Joi.string().required(),
            genre: Joi.string().required(),
            stock: Joi.number()
        }),
        update: Joi.object<IBook>({
            title: Joi.string().required(),
            author: Joi.string().required(),
            description: Joi.string().required(),
            genre: Joi.string().required(),
            stock: Joi.number()
        })
    },
    user: {
        create: Joi.object<IUser>({
            email: Joi.string()
            .required()
        })
    }
}