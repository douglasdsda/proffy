import Knex from 'knex';

export async function up(knex: Knex) {
    await knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();
        table
            .timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
        table
            .timestamp('updated_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
        table
            .integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    await knex.schema.dropTable('class_schedule');
}
