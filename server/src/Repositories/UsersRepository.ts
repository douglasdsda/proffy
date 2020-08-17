import db from "../database/connections";
import User from "../entities/User";

class UserRepository {
  constructor() {}

  async index(): Promise<any[]> {
    const users = await db("users")
      .whereExists(function () {
        this.select("users.*").from("users");
      })
      .select(["users.*"]);

 

    return users;
  }

  async create(user: User): Promise<any> {
    const { name, sobrenome, email, password } = user;

    const trx = await db.transaction();

    const insertedUserIds = await trx("users").insert({
      name,
      sobrenome,
      email,
      password,
    });

    await trx.commit();
    return { name, sobrenome, email, password, id: insertedUserIds[0] };
  }
}

export default UserRepository;
