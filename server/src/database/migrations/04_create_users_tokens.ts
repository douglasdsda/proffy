import Knex from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("users_tokens", (table) => {
    table.increments("id").primary();
    table.string("token");
    table
      .timestamp("created_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
      .notNullable();

    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable("users_tokens");
}
