import { Knex } from 'knex';

const config: Record<string, Knex.Config> = {
  development: {
    client: 'pg', // PostgreSQL
    connection: {
      host: 'db',
      user: 'myuser',
      password: 'mypassword',
      database: 'mydatabase',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
  },
};

export default config;
