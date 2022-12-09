const Joi=require('joi')
const EmploiSchema=Joi.object({
    id_emploi:Joi.number(),
    titre_emploi:Joi.string().required(),
    descriptif_emploi:Joi.string().required(),
    secteur:Joi.string().required(),
    ref_emploi:Joi.string().required(),
    date_expiration:Joi.date().greater('now').required(),
    id_compte:Joi.required(),

 })

 const CandidatureSchema=Joi.object({
    id_emploi:Joi.required(),
    id_compte:Joi.required(),
    date_candidature:Joi.date().required(),
    url_cv:Joi.string().required(),
    niveau:Joi.string().required(),
    message:Joi.string().required(),

 })

 module.exports = {
    EmploiSchema,
    CandidatureSchema
}
