import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodError, ZodSchema } from "zod";

import { ServiceResponse } from "@/common/models/serviceResponse";

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest: <T>(schema: ZodSchema<T>) => (
    (req: Request<T>, res: Response, next: NextFunction) => Response | undefined
)  = (schema) => (req, res, next) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    console.log(err)
    const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
    const statusCode = StatusCodes.BAD_REQUEST;
    const serviceResponse = ServiceResponse.failure(errorMessage, null, statusCode);
    return handleServiceResponse(serviceResponse, res);
  }
};

export const validateParams: <T>(schema: ZodSchema<T>) => (
    (req: Request<T>, res: Response, next: NextFunction) => Response | undefined
)  = (schema) => (req, res, next) => {
  try {
    schema.parse(req.params);
    next();
  } catch (err) {
    console.log(err)
    const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
    const statusCode = StatusCodes.BAD_REQUEST;
    const serviceResponse = ServiceResponse.failure(errorMessage, null, statusCode);
    return handleServiceResponse(serviceResponse, res);
  }
};

export const validateQuery: <T>(schema: ZodSchema<T>) => (
    (req: Request<null, null, null, T>, res: Response, next: NextFunction) => Response | undefined
)  = (schema) => (req, res, next) => {
  try {
    schema.parse(req.query);
    next();
  } catch (err) {
    console.log(err)
    const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
    const statusCode = StatusCodes.BAD_REQUEST;
    const serviceResponse = ServiceResponse.failure(errorMessage, null, statusCode);
    return handleServiceResponse(serviceResponse, res);
  }
};
