import multer from "multer";
import path from "path";
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
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "images"));
  },
  filename: (req, file, cb) => {
    cb(null, (file.fieldname = v4() + "." + file.mimetype.split("/")[1]));
  },
});

const Upload = multer({ storage });

export { Upload };
