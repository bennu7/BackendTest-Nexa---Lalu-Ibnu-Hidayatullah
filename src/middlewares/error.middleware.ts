import { NextFunction, Request, Response } from "express";
import { HttpException } from "../errors/handler.error";
import { NODE_ENV } from "../utils/const.util";

export function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status_code || 500;
  const message = error.message || "Something went wrong";
  const details = error.details;
  const stack = error.stack.split("\n").map((line) => line.trim());

  return res.status(status).send({
    status,
    message,
    details: NODE_ENV !== "PRODUCTION" ? stack || details : details,
  });
}
