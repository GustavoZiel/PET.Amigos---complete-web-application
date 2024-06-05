import { Sequelize, Model, DataTypes } from "sequelize";
import 'dotenv/config';

const PGHOST = process.env['PGHOST'];
const PGUSER = process.env['PGUSER'];
const PGDATABASE = process.env['PGDATABASE'];
const PGPASSWORD = process.env['PGPASSWORD'];

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    dialect: "postgres",
    host: PGHOST,
    port: 5432,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

export default sequelize;