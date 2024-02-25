import Joi from "joi"
export const productValid = Joi.object({
    name:Joi.string().required().min(3),
    price: Joi.number().required().min(1),
    description: Joi.string(),
    sku: Joi.string(),
    url: Joi.string()
})