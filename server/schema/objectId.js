import Joi from "joi";

export const objectIdSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/, "hexadecimal")
    .length(24)
    .message("Invalid ObjectId"),
});
