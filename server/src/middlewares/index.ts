import { Request, Response, NextFunction } from 'express';
import jwt, { verify } from 'jsonwebtoken';
import AppError from '../errors/AppErros';
import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: number;
}

export default function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new Error('JWT token is missing');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        jwt.verify(token, authConfig.jwt.secret);

        req.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new AppError('Invalid JWT token', 401);
    }
}
