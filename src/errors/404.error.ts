import { Request, Response } from "express";

export const notFoundRoute = (req: Request, res: Response) => {
  res.status(404).json({
    status_code: 404,
    message: "OOPS! Not Found Route",
  });
};
