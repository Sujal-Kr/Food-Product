import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "any.required": "Product name is required.",
    "string.min": "Product name should have at least 3 characters.",
    "string.max": "Product name should not exceed 50 characters.",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number.",
    "number.positive": "Price must be a positive number.",
    "any.required": "Price is required.",
  }),
  category: Joi.string()
    .valid("other", "salad", "veg", "nonveg")
    .required()
    .messages({
      "any.required": "Category is required.",
      "any.only": "Invalid Category",
    }),
});

