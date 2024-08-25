

import express, { type Router } from "express";
import { driverSalaryController } from "./controller";
import { validateQuery } from "@/common/utils/httpHandlers";
import { DriverSalaryGetParams, DriverSalaryGetParamsSchema } from "@/driverSalary/model";

export const driverSalariesRouter: Router = express.Router();

driverSalariesRouter.get<null, null, null, DriverSalaryGetParams>(
    '/list',
    validateQuery(DriverSalaryGetParamsSchema),
    driverSalaryController.getDriverSalaries
);
