import { Request, Response, NextFunction, RequestHandler } from "express";
import * as statusCode from "http-status";
import { validate, ValidationError } from "class-validator";
import { plainToClass, ClassConstructor } from "class-transformer";
import { responseError } from "../utils/response.util";

function getConstraintValue(obj: object): unknown {
  for (const prop in obj) {
    if (prop === "constraints") {
      return obj[prop];
    } else if (typeof obj[prop] === "object") {
      const result = getConstraintValue(obj[prop]);
      if (result) {
        return result;
      }
    }
  }
}

const validationMiddleware = (
  type: ClassConstructor<object>,
  value: string | "body" | "query" | "params" = "body",
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors = await validate(plainToClass(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    });

    if (errors.length > 0) {
      console.log("ERRORS", errors);
      const message = errors.map((error: ValidationError) =>
        Object.values(getConstraintValue(error) as unknown as string)
      );

      return responseError(
        res,
        statusCode.UNPROCESSABLE_ENTITY,
        "UNPROCESSABLE ENTITY",
        message[0][0]
      );
    } else {
      next();
    }
  };
};

export default validationMiddleware;
