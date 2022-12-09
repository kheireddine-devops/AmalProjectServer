const Joi = require ('joi');



const SchemaValidation= Joi.object({
   text:Joi.string().min(3).max(250).required().messages({
        "any.required": "text message is required",
        "string.min": "text doit être superieur à 3"
    }),
    
}).options({
    abortEarly: false
});

 module.exports = SchemaValidation;