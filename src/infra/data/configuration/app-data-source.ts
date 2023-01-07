import { DataSource } from 'typeorm';
import { UserModel } from '../models/user.model';

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [UserModel],
    subscribers: [],
    migrations: ["src/data/migrations/**.ts"],
});

export function initialize() {
    AppDataSource
        .initialize()
        .then(source => {
            console.log("Applying migrations");
            source.runMigrations().then();
            console.log("Applied migrations");
        })
        .catch(ex => console.log("DataBase Is Not Running: " + ex.message));
}

export function getDataSource() {
    return AppDataSource;
}