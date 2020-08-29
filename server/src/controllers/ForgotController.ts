import { Request, Response } from "express";

import { hash, compare } from "bcryptjs";
import db from "../database/connection";
 
import sendMail from "../services/ProviderEmail";
import authConfig from "../config/auth";

 

let tokenTimer: NodeJS.Timeout;

export default class ForgotController {
  static async create(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const user = await db("users")
        .select("id")
        .where("email", "=", email)
        .first();

      if (!user)
        return res.status(400).json({ error: "invalid email or password." });

      const userId = user.id;

      const usersToken = await hash(email, 8);

      const find_user = await db("users_tokens")
        .select("user_id")
        .where("user_id", "=", userId)
        .first();

      if (find_user)
        await db("users_tokens")
          .update({ token: usersToken })
          .where("user_id", "=", userId);
      else
        await db("users_tokens").insert({
          user_id: userId,
          token: usersToken,
        });

      if (tokenTimer) clearTimeout(tokenTimer);

      tokenTimer = setTimeout(
        async () =>
          await db("users_tokens").delete("*").where("user_id", "=", userId),
        authConfig.jwt.expiresIn
      );

      sendMail(email, usersToken)
        .then(() => res.status(200).json({ status: "OK" }))
        .catch((err) =>
          res.status(400).json({
            error: "Internal server error.",
          })
        );
    } catch (err) {
      return res.status(400).json({
        error: "Internal server error.",
      });
    }
  }
}
