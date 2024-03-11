import multer from "multer";

export interface multerFile {
  buffer: Buffer;
  encoding: string;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}

const storage = multer.memoryStorage();

const Upload = multer({ storage });

export { Upload };
