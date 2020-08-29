import Knex from 'knex'

export async function up(knex: Knex) {
    await knex.schema.createTable('classes', table => {
        table.increments("id").primary();
        table.string('subject').notNullable()
        table.decimal('cost').notNullable()
        
        table.timestamp('created_at')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        .notNullable();
        table.timestamp('updated_at')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        .notNullable();

        table.string('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
}

export async function down(knex: Knex) {
    await knex.schema.dropTable('classes')
}