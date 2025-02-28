import multer from "multer";
import path from "path";
import { ApiError } from "../utils/error.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  dest: "./upload",
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".xlsx" && ext !== ".xls") {
      return cb(new ApiError(400, "Only Excel files are allowed!"), false);
    }
    cb(null, true);
  },
});

export { upload };
