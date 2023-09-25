import pgPromise, { IDatabase, IMain } from 'pg-promise';

// Initialize pg-promise
const pgp: IMain = pgPromise({});

// Define your database connection options
const connectionOptions = {
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://myuser:mypassword@db:5432/mydatabase',
};

// Create a database instance
const db: IDatabase<unknown> = pgp(connectionOptions);

export { db, pgp };
