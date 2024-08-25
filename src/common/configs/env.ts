import dotenv from "dotenv";
import { cleanEnv, host, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly("test"), choices: ["development", "production", "test"] }),
  HOST: host({ devDefault: testOnly("localhost") }),
  PORT: port({ devDefault: testOnly(3000) }),
  DB_HOST: host({ devDefault: testOnly("localhost") }),
  DB_PORT: port({ devDefault: testOnly(3000) }),
  DB_NAME: str(),
  DB_USER: str(),
  DB_PASSWORD: str(),
});
