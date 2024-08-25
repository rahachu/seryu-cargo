import type { Request, RequestHandler, Response } from "express";

import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { DriverSalary, DriverSalaryGetParams, DriverSalaryGetParamsSchema, DriverSalarySchema } from "./model";
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
      new Pagination<DriverSalary>({
        data: queryResult.map((o) => DriverSalarySchema.parse(o)),
        page_size: params.page_size,
        current: params.current,
        total_row: queryResult[0]?.total_row
      })
    );
    return handleServiceResponse(serviceResponse, res);
  };
}

export const driverSalaryController = new DriverSalaryController();