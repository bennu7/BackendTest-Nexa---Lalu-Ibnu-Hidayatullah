import * as multer from "multer";
import * as fs from "fs";

const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
});
// export const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       const dir = "./images/karyawan";
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//       }

//       cb(null, "./images/karyawan");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
//     },
//   }),
// });
