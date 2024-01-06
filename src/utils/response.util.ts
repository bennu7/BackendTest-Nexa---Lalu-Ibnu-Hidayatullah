import { Response } from "express";

export const responseData = (
  res: Response,
  status: number,
  message: string,
  data?: any
) => {
  res.status(status).json({
    status_code: status,
    message,
    data,
  });
};

export const responseError = (
  res: Response,
  status: number,
  message: string,
  detail?: any
) => {
  res.status(status).json({
    status_code: status,
    message,
    detail,
  });
};
