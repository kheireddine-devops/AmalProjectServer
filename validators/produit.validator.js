    const Joi = require ('joi');



    const SchemaValidation= Joi.object({
        libelleP:Joi.string().alphanum().min(3).max(30).required().messages({
            "any.required": "libelle est obligatoire",
            "string.min": "le nom doit être supérieur à 3 caractères"
        }),
        prixP:Joi.number().positive().messages({
            "any.required": "le prix est obligatoire",
            "string.positive": "le prix doit etre positif"
        }),

        descriptionP:Joi.string().min(3).max(500).required().messages({
            "any.required": "le prix est obligatoire",
            "string.positive": "le prix doit etre positif",
            "string.max":"La description est trop long"
        }),
        photoP:Joi.string().required().messages({
            "any.required": "l'image est obligatoire"
        }),

        numVendeur:Joi.number().max(99999999).required().messages({
            "any.required": "le numero est obligatoire",
            "string.max": "le numero doit etre composée de 8 chiffres"
        }),
        cathegorie:Joi.string().required().messages({
            "any.required": "le prix est obligatoire"
        }),

    }).options({
        abortEarly: false
    });
     module.exports = SchemaValidation;