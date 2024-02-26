import Joi from "joi"
export const signUpValidator = Joi.object({
    userName:Joi.string().required().min(6).max(255).messages({
        'string.empty' : 'userName do not empty!',
        'any.required' : 'userName is required!',
        'string.min' : 'userName must be at least {#limit} characters !',
        'string.max' : 'userName must be less than {#limit + 1} characters !',
    }),
    email: Joi.string().required().email().messages({
        'string.empty' : 'email do not empty!',
        'any.required' : 'email is required!',
        'string.email' : 'Email invalidate !',
    }),
    password: Joi.string().required().min(6).max(255).messages({
        'string.empty' : 'password do not empty!',
        'any.required' : 'password is required!',
        'string.min' : 'password must be at least {#limit} characters !',
        'string.max' : 'password must be less than {#limit + 1} characters !',
    }),
    confirmPassword: Joi.string().required().min(6).valid(Joi.ref('password')).messages({
        'string.empty' : 'confirmPassword do not empty!',
        'any.required' : 'confirmPassword is required!',
        'string.min' : 'confirmPassword must be at least {#limit} characters !',
        'string.max' : 'confirmPassword must be less than {#limit + 1} characters !',
        'any.only' : 'confirmPassword does not match password !',
    }),
    role: Joi.string()
})

export const loginValidator = Joi.object({
    email: Joi.string().required().email().messages({
        'string.empty' : 'email do not empty!',
        'any.required' : 'email is required!',
        'string.email' : 'Email invalidate !',
    }),
    password: Joi.string().required().min(6).max(255).messages({
        'string.empty' : 'password do not empty!',
        'any.required' : 'password is required!',
        'string.min' : 'password must be at least {#limit} characters !',
        'string.max' : 'password must be less than {#limit + 1} characters !',
    })
})