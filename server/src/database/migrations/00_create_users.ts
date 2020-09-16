import Knex from 'knex';

export async function up(knex: Knex) {
    await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('sobrenome').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('avatar');
        table.string('whatsapp');
        table.string('bio');
        table
            .timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
        table
            .timestamp('updated_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    });
}

export async function down(knex: Knex) {
    await knex.schema.dropTable('users');
}
