import Joi from "joi";

const orderValidationSchema = Joi.object({
  items: Joi.array().items(Joi.string().hex().length(24)).min(1).required(), 
  amount: Joi.number().positive().required(),
  payment: Joi.boolean().default(false),
});

const paymentStatus = Joi.object({
  payment: Joi.boolean().default(false),
});

export { orderValidationSchema, paymentStatus };
