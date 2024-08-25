import type { Request, RequestHandler, Response } from "express";

import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { DriverSalaryGetParams, DriverSalaryGetParamsSchema } from "./model";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { Pagination } from "@/common/models/pagination";
import { DriverSalaryRepository } from "./repository";

class DriverSalaryController {
  public getDriverSalaries: RequestHandler<null, null, null, DriverSalaryGetParams> = async (
    req: Request<null, null, null, DriverSalaryGetParams>,
    res: Response
  ) => {
    const params: DriverSalaryGetParams = DriverSalaryGetParamsSchema.parse(req.query);

    const queryResult = await DriverSalaryRepository.findDriverSalaryWithFilter(params);
    const serviceResponse = ServiceResponse.success(
      'test',
      new Pagination({data: queryResult})
    );
    return handleServiceResponse(serviceResponse, res);
  };
}

export const driverSalaryController = new DriverSalaryController();