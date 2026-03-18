import {type Request, type Response, type NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

declare global {
    namespace Express {
        interface Request {
            user?: { userId: number, email: string };
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {

    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
            res.status(401).json({ error: 'Token not provided' });
            return;
        }

        const decoded = jwt.verify(token, SECRET_KEY!) as { userId: number, email: string };
        req.user = { userId: decoded.userId, email: decoded.email };
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired token' });
    }
   
}