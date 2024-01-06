import * as express from "express";
import { Express } from "express";
const routes: Express = express();

import adminController from "../api/admin/admin.controller";
import karyawanController from "../api/karyawan/karyawan.controller";

routes.use("/api/admin", adminController);
routes.use("/api/karyawan", karyawanController);

export default routes;
