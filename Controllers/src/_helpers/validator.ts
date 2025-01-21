import   Joi from 'joi';

const priceSchema = Joi.object({
    priceKey: Joi.string().min(3).max(10).required().messages({
      'string.base': '"priceKey" must be a string',
      'string.min': '"priceKey" must be at least 3 characters long',
      'string.max': '"priceKey" must be at most 10 characters long',
      'any.required': '"priceKey" is required',
    }),
    priceValue: Joi.number().positive().required().messages({
      'number.base': '"priceValue" must be a number',
      'number.positive': '"priceValue" must be positive',
      'any.required': '"priceValue" is required',
    }),
  });
  
 

export const ValidateSchema = Joi.object({
    id : Joi.number()
         .required(),
    name : Joi.string()
           .min(3)
           .max(20)
           .required(),
    description: Joi.string()
                 .min(3)
                 .max(50),
    price: Joi.array().items(priceSchema).messages({
        'array.base': '"prices" must be an array of price objects',
      }),
    categoryId : Joi.number()
     ,
    restrauntId: Joi.number()
})