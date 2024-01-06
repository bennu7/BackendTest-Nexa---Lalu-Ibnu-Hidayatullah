import * as express from "express";
import { Request, Response, Express } from "express";
import * as asyncHandler from "express-async-handler";
import * as statusCode from "http-status";

const karyawanController: Express = express();
import { KaryawanService } from "./karyawan.service";
const karyawanService = new KaryawanService();
import { authMiddlewareAdmin } from "../../middlewares/auth.middleware";
import { upload } from "../../utils/multer.util";
import { responseData } from "../../utils/response.util";
import validationMiddleware from "../../middlewares/validator-input.middleware";
import {
  KaryawanQueryParams,
  KaryawanRegisterDto,
  KaryawanParamDto,
  KaryawanUpdateDto,
  KaryawanNonActifBodyDto,
} from "./karyawan.dto";
interface RequestWithUser extends Request {
  user: {
    username: string;
    role: string;
  };
  file: Express.Multer.File;
}

karyawanController.get(
  "/",
  authMiddlewareAdmin,
  validationMiddleware(KaryawanQueryParams, "query"),
  asyncHandler(async (req: Request, res: Response) => {
    const { keyword, start, count, sort_by } = req.query;

    const karyawan = await karyawanService.getKaryawan(
      (keyword as string) || "",
      parseInt(start as string) || 1,
      parseInt(count as string) || 20,
      sort_by as "ASC" | "DESC"
    );

    if (karyawan.count === 0)
      return responseData(
        res,
        statusCode.NOT_FOUND,
        "DATA KARYAWAN TIDAK DITEMUKAN",
        null
      );

    return responseData(
      res,
      statusCode.OK,
      "SUKSESS AMBIL SEMUA DATA KARYAWAN",
      {
        source: karyawan.data,
        currentPage: parseInt(start as string) || 1,
        totalPage: karyawan.totalPage,
        totalDataPerPage: parseInt(count as string) || 20,
        countData: karyawan.count,
      }
    );
  })
);

karyawanController.post(
  "/new",
  authMiddlewareAdmin,
  upload.single("photo"),
  validationMiddleware(KaryawanRegisterDto, "body"),
  asyncHandler(async (req: RequestWithUser, res: Response) => {
    const photo = req.file;
    const { nip, nama, alamat, gend, tgl_lahir } = req.body;
    const user = req.user;

    let photoBase64 = "";
    if (photo && photo.buffer) {
      photoBase64 = photo.buffer.toString("base64");
    }

    const karyawanRegistered = await karyawanService.createKaryawan({
      nip,
      nama,
      alamat,
      gend,
      photo: photoBase64,
      tgl_lahir,
      username_admin: user.username,
    });

    return responseData(
      res,
      statusCode.CREATED,
      "SUKSES MEMBUAT DATA KARYAWAN",
      karyawanRegistered
    );
  })
);

karyawanController.put(
  "/:nip",
  authMiddlewareAdmin,
  validationMiddleware(KaryawanParamDto, "params"),
  upload.single("photo"),
  validationMiddleware(KaryawanUpdateDto, "body"),
  asyncHandler(async (req: RequestWithUser, res: Response) => {
    const { nama, alamat, gend, tgl_lahir } = req.body;
    const { nip } = req.params;
    const photo = req.file;
    const user = req.user;

    let photoBase64 = "";
    if (photo && photo.buffer) {
      photoBase64 = photo.buffer.toString("base64");
    }

    const karyawanUpdated = await karyawanService.updateKaryawan(
      {
        nama,
        alamat,
        gend,
        photo: photoBase64,
        tgl_lahir,
        username_admin: user.username,
      },
      nip
    );

    return responseData(
      res,
      statusCode.OK,
      "SUKSES MEMPERBAHARUI DATA KARYAWAN",
      karyawanUpdated
    );
  })
);

karyawanController.put(
  "/nonaktif/:nip",
  authMiddlewareAdmin,
  validationMiddleware(KaryawanParamDto, "params"),
  validationMiddleware(KaryawanNonActifBodyDto, "body"),
  asyncHandler(async (req: RequestWithUser, res: Response) => {
    const { nip } = req.params;
    const { status } = req.body;
    const user = req.user;

    await karyawanService.nonaktifKaryawan(
      user.username,
      nip,
      parseInt(status)
    );

    return responseData(
      res,
      statusCode.OK,
      "SUKSES NONAKTIFKAN DATA KARYAWAN",
      null
    );
  })
);

export default karyawanController;
