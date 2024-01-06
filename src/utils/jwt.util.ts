import * as jwt from "jsonwebtoken";
import { JWT_KEY } from "./const.util";

export const generateToken = (
  payload: any,
  expiresIn: jwt.SignOptions["expiresIn"]
): string => {
  return jwt.sign(payload, JWT_KEY as string, { expiresIn });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_KEY as string, {
    ignoreExpiration: false,
  });
};
