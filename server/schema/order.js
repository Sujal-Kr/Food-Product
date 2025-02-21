import Joi from "joi";

const orderValidationSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        product: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, "hexadecimal")
          .length(24)
          .message("Invalid ObjectId"),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
  payment: Joi.boolean().default(false),
});

const paymentStatus = Joi.object({
  payment: Joi.boolean().default(false),
});

export { orderValidationSchema, paymentStatus };
