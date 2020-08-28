import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../database/connection";
import authConfig from "../config/auth";

function generateToken(id: string, expiresIn = authConfig.jwt.expiresIn) {
  return jwt.sign({ id }, authConfig.jwt.secret, { expiresIn });
}

 
export default class SessionsController {
  static async create(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const fetchUserPassword: { password: string }[] = await db("users")
        .select("password")
        .where("email", "=", email);

      if (fetchUserPassword.length === 0) {
        res.status(400).json({
          error: "Email not exists.",
        });
      } else {
        const fetchedPassword = fetchUserPassword[0].password;

        bcrypt.compare(password, fetchedPassword, async (err, same) => {
          if (err)
            return res.status(400).json({
              error: "Internal server error.",
            });
          else if (!same)
            return res
              .status(400)
              .json({ error: "Password or Email is invalid." });
          else {
            const user = await db("users")
              .select(
                "id",
                "name",
                "sobrenome",
                "avatar",
                "email",
                "whatsapp",
                "bio"
              )
              .where("email", "=", email)
              .first();

            const token = generateToken(user.id);

            return res.status(200).json({ user, token });
          }
        });
      }
    } catch (err) {
      return res.status(400).json({
        error: "Internal server error.",
      });
    }
  }
}
