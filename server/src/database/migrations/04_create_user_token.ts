import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("userTokens", (table) => {
    table.increments("id").primary();
    table.string("token").notNullable();
   
    table.timestamp('created_at')
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    .notNullable();
    table.timestamp('updated_at')
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    .notNullable();

    table.integer("user_id").notNullable().references("id").inTable("users").onUpdate('CASCADE').onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("userTokens");
}
