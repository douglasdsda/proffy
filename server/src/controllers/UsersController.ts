import { Request, Response } from "express";
import { uuid } from "uuidv4";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../database/connection";
import authConfig from "../config/auth";
 

function generateToken(id: string, expiresIn = authConfig.jwt.expiresIn) {
  return jwt.sign({ id }, authConfig.jwt.secret, { expiresIn });
}
 
export default class UsersController {
  static async create(req: Request, res: Response) {
    const { name, sobrenome, email, password } = req.body;

    try {
      const response = await db("users").select("*").where("email", "=", email);
      if (response.length > 0) {
        return res.status(400).json({ error: "Email addres alredy used." });
      } else {
        bcrypt.genSalt(8, async (_, salt) => {
          const hashPassword = await bcrypt.hash(password, salt);

          const limit =
            String(email).length > String(password).length
              ? String(email).length
              : String(password).length;

          const newUser = {
            id: uuid(),
            name,
            sobrenome,
            email,
            password: hashPassword,
          };

          const registerUser = await db("users").insert(newUser);

          if (registerUser) return res.status(200).send();
          else
            return res.status(400).json({
              error: "Error in Create User",
            });
        });
      }
    } catch (err) {
      return res.status(400).json({ error: "Internal server error" + err });
    }
  }
}
