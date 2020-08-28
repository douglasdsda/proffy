import { Request, Response } from "express";
import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";
import { uuid } from "uuidv4";

interface ScheduleItem {
  week_day: { value: number };
  from: string;
  to: string;
}

export default class ClassesController {
  static async index(req: Request, res: Response) {
    const { subject, week_day, from, to } = req.query;

    const timeFrom = convertHourToMinutes(String(from));
    const timeTo = convertHourToMinutes(String(to));

    const search = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
          .where("week_day", "like", week_day ? week_day : ("%" as any))
          .where("from", ">=", from ? (from !== "null" ? timeFrom : 0) : 0)
          .where("to", "<=", to ? (to !== "null" ? timeTo : 1440) : 1440);
      })
      .join("users", "users.id", "=", "user_id")
      .select("*")
      .where("subject", "like", subject ? subject : ("%" as any));

    return res.status(200).json({ search });
  }

  static async create(req: Request, res: Response) {
    const {
      name,
      email,
      sobrenome,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = req.body;

    const trx = await db.transaction();

    try {
      const arrayUser = await trx("users")
        .select("*")
        .where("email", "=", email);

      if (arrayUser.length === 0) throw new Error("User email not exists.");

      const user = arrayUser[0];
      console.log({
        id: user.id,
        name,
        email,
        avatar,
        whatsapp,
        sobrenome,
        bio,
      });

      const insertedUsersIds = await trx("users").insert({
        id: user.id,
        name,
        sobrenome,
        email,
        password: user.password,
        avatar: user.avatar || avatar,
        whatsapp,
        bio,
      });

      const user_id = insertedUsersIds[0];

      const insertedClassesIds = await trx("classes").insert({
        id: uuid(),
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassesIds[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
        id: uuid(),
          week_day: scheduleItem.week_day.value,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
          class_id,
        };
      });

      await trx("class_schedule").insert(classSchedule);

      await trx.commit();
      return res.status(201).json({ message: "Success" });
    } catch (err) {
      await trx.rollback();
      return res
        .status(400)
        .json({ message: "Unexpected error occurred while creating class." });
    }
  }
}
