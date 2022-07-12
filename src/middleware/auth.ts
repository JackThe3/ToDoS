import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import { secret } from '../config';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({message: "A token is required for authentication"});
    }
    try {
        req.body.verifyToken = jwt.verify(token, secret);
    } catch (err) {
        return res.status(401).send({message: "Invalid Token"});
    }
    return next();
};



