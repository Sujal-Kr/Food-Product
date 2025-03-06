import Joi from "joi";


const signupSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required()    
});


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required()
});

export { signupSchema, loginSchema };
