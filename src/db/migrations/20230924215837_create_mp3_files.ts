// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Knex from 'knex';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.up = async (knex: any): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await knex.schema.createTable('mp3_files', (table: any) => {
    table.increments('id').primary();
    table.string('filename').notNullable();
    table.binary('mp3_data').notNullable();
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.down = async (knex: any): Promise<void> => {
  await knex.schema.dropTable('mp3_files');
};
