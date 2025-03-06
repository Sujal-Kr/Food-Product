import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import xlsx from "xlsx";
import {
  JWT_SECRET_KEY,
  options,
  PASSWORD,
  RECEIVER_MAIL,
  SENDER_MAIL,
} from "../constants/config.js";
const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY);
  res.cookie("token", token, options);
  return res.status(code).json({
    success: true,
    message,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

const writeToExcel = (products, fileName) => {
  const worksheet = xlsx.utils.json_to_sheet(products);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Products");
  console.log("first");
  xlsx.writeFile(workbook, `upload/${fileName}`);
  console.log(`Excel file ${fileName} written successfully`);
};

const readFromExcel = (buffer) => {
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  return data;
};

const sendEmailWithAttachment = async (filePath) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SENDER_MAIL,
      pass: PASSWORD,
    },
  });

  const mailOptions = {
    from: SENDER_MAIL,
    to: RECEIVER_MAIL,
    subject: "Exported Products Data",
    text: "Please find attached the exported product data.",
    attachments: [
      {
        filename: "products.xlsx",
        path: filePath,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  console.log("Email sent successfully!");
};
export { readFromExcel, sendEmailWithAttachment, sendToken, writeToExcel };
