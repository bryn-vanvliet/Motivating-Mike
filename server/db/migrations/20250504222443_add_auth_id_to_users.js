/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.table('users', function(table) {
    table.string('auth_id');
  });
}

export function down(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('auth_id');
  });
}
