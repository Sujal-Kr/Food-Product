import multer from "multer";

const upload = multer({
  dest: "./upload",
});

export { upload };
