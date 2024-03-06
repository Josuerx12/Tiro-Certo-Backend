import multer from "multer";
import { v4 } from "uuid";

export interface multerFile {
  buffer: Buffer;
  encoding: string;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../images");
  },
  filename(req, file, cb) {
    cb(null, v4());
  },
});

const Upload = multer({ storage });

export { Upload };
