import { DataSource } from "typeorm";
import {
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
} from "../utils/const.util";

export const configSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: DB_PORT as unknown as number,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: ["src/models/*.model.ts"],
  logging: true,
  synchronize: true,
});
