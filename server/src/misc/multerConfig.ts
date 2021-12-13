import { Request } from "express";
import multer from "multer";

const imageStorage = multer.diskStorage({
  destination: "./data/images/",
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => {
    if (!req.userId) return callback(new Error("Not authorized"), "errorfile");
    callback(null, req.userId);
  },
});

const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  if (
    file.mimetype !== "image/png" &&
    file.mimetype !== "image/jpg" &&
    file.mimetype !== "image/jpeg"
  ) {
    return callback(null, false);
  }
  callback(null, true);
};

const upload = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

export default upload;
