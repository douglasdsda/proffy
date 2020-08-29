import { Request, Response, NextFunction } from "express";
import jwt, { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: number;
}

export = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "token is empty." });

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    jwt.verify(token, authConfig.jwt.secret);
 
    req.user = {
      id: sub,
    };
 

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token is invalid." });
  }
};
