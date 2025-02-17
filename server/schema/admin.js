import Joi from "joi";

const adminKeySchema = Joi.object({
    secret: Joi.string().required(),
});
export { adminKeySchema };
