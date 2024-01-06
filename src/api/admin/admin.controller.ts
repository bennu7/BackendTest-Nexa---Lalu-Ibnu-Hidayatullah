import * as express from "express";
import { Request, Response, Express } from "express";
import * as asyncHandler from "express-async-handler";
import * as statusCode from "http-status";

const adminController: Express = express();
import { AdminService } from "./admin.service";
const adminService = new AdminService();
import { responseData } from "../../utils/response.util";

adminController.get(
  "/all",
  asyncHandler(async (req: Request, res: Response) => {
    const admins = await adminService.getAdmins();

    return responseData(res, statusCode.OK, "Get all admins success", admins);
  })
);

adminController.post(
  "/create",
  asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const admin = await adminService.createAdmin({ username, password });

    return responseData(
      res,
      statusCode.CREATED,
      "SUKSES MEMBUAT ADMIN BARU",
      admin
    );
  })
);

adminController.post(
  "/login",
  asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const token = await adminService.loginAdmin({ username, password });

    return responseData(res, statusCode.OK, "LOGIN BERHASIL", { token });
  })
);

export default adminController;
