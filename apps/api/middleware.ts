import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const authMiddleWare = (req:Request, res:Response, next: NextFunction) => {
    const header = req.headers.authorization!;

    try { 
        let data = jwt.verify(header, process.env.JWT_SECRET!);
        req.user_id = data.sub as string;
        next();
    } catch (e){
        res.status(403).send("");
    }
}




