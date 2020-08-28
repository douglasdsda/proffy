import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../database/connection";
import authConfig from "../config/auth";

export default class ResetPasswordController {
  static async create(req: Request, res: Response) {
    const { token, new_password } = req.body;
    try {
      const userToken = await db("users_tokens")
        .select("*")
        .where("token", "=", token)
        .first();

      if (userToken) {
        jwt.verify(token, authConfig.jwt.secret, async (err: any) => {
          if (err) return res.status(401).json({ error: "token ixpired." });

          const user_id = userToken.user_id;

          bcrypt.genSalt(8, async (_, salt) => {
            const hash = await bcrypt.hash(new_password, salt);

            await db("users").where("id", "=", user_id).update({
              password: hash,
            });

            await db("users_tokens").delete("*").where("user_id", "=", user_id);

            return res.status(200).json({ status: "OK" });
          });
        });
      } else
        return res.status(400).json({
          error: "token is invalid, token used.",
        });
    } catch (err) {
      return res.status(400).json({
        error: "Internal server error.",
      });
    }
  }
}
