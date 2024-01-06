import { Response, Request as ExpressRequest, NextFunction } from "express";
import * as statusCode from "http-status";

import { configSource } from "../db/config";
import { Admin } from "../models/admin.model";
import { verifyToken } from "../utils/jwt.util";
import { HttpException } from "../errors/handler.error";

interface Request extends ExpressRequest {
  user: any;
}

export const authMiddlewareAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new HttpException(statusCode.UNAUTHORIZED, "Unauthorized");
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      throw new HttpException(statusCode.UNAUTHORIZED, "Unauthorized");
    }
    const adminModel = configSource.getRepository(Admin);

    const admin = await adminModel.findOne({
      where: {
        id: decoded.id,
        username: decoded.username,
      },
    });

    if (!admin) {
      throw new HttpException(
        statusCode.FORBIDDEN,
        "SORRY, YOU'RE NOT ADMIN ROLE"
      );
    }
    const payload = {
      ...decoded,
      role: "ADMIN",
    };

    req.user = payload;
    next();
  } catch (error) {
    switch (error.name) {
      case "TokenExpiredError":
        error = new HttpException(statusCode.UNAUTHORIZED, "Token Expired");
        break;
      case "JsonWebTokenError":
        error = new HttpException(statusCode.UNAUTHORIZED, "Invalid Token");
        break;
      default:
        break;
    }
    next(error);
  }
};
