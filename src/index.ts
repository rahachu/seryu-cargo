import express, { Express, Request, Response } from "express";
import { driverSalariesRouter } from "./driverSalary/router";
import errorHandlers from "./common/utils/errorHandlers";
import { env } from "./common/configs/env";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Seryu Cargo Backend Services");
});

app.use("/v1/salary/driver", driverSalariesRouter);


app.use(errorHandlers());

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  console.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

const onCloseSignal = () => {
  console.info("sigint received, shutting down");
  server.close(() => {
    console.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
