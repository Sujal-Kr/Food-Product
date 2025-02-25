import Joi from "joi"
const fileSchema = Joi.object({
  fieldname: Joi.string().valid("product").required(),
  originalname: Joi.string()
    .pattern(/\.csv$/i)
    .required(),
  mimetype: Joi.string()
    .valid("text/csv", "application/vnd.ms-excel")
    .required(),
});

export { fileSchema };
