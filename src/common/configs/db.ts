import pgPromise, { IDatabase } from "pg-promise";
import { env } from "./env";

const pgp = pgPromise({
    // init options
});

interface IExtensions {
}

const db: IDatabase<IExtensions> & IExtensions = pgp({
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
});

export default db;
