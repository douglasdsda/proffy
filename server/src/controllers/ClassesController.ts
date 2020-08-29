import { Request, Response } from "express";
import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
  class_id: any;
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
      const user_id = req.user.id;

      const arrayUser = await trx("users")
        .select("*")
        .where("id", "=", user_id);

      if (arrayUser.length === 0) throw new Error("User User not exists.");

      const user = arrayUser[0];

      const insertedUsersIds = await trx("users")
        .where("id", "=", user_id)
        .update({
          id: user_id,
          name,
          sobrenome,
          email,
          password: user.password,
          avatar: user.avatar || avatar,
          whatsapp,
          bio,
        });

      // const user_id = insertedUsersIds;

      const hasClasses_userId = await trx("classes")
        .select("id")
        .where("user_id", "=", user_id)
        .first();
      let class_id: any;

      if (hasClasses_userId && hasClasses_userId.id) {
        class_id = hasClasses_userId.id;
        await trx("classes").where("id", "=", hasClasses_userId.id).update({
          id: hasClasses_userId.id,
          subject,
          cost,
          user_id,
        });
      } else {
        class_id = await trx("classes").insert({
          subject,
          cost,
          user_id,
        });
      }

      if (class_id > 0) {
        class_id = hasClasses_userId ? class_id : class_id[0];
  
        const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
          return {
            week_day: scheduleItem.week_day,
            from: convertHourToMinutes(scheduleItem.from),
            to: convertHourToMinutes(scheduleItem.to),
            class_id,
          };
        });

        console.log("shedule: ", classSchedule[0]);
        await trx("class_schedule").insert(classSchedule);
      }

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
