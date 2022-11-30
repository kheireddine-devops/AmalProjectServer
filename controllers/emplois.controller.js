const db=require('../models')
const Joi=require('joi')
const Schema=Joi.object({
    titre_emploi:Joi.string().required(),
    descriptif_emploi:Joi.string().required(),
    secteur:Joi.string().required(),
    ref_emploi:Joi.string().required(),
    date_expiration:Joi.date().required(),
    id_compte:Joi.required(),

 })


 const addEmploi = function(req, res, next) {
    const joiError=Schema.validate(req.body)
    if(joiError.error){
        return res.status(400).send(joiError.error.details[0].message)
    }
    
    db.emplois.create( req.body)
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
}


const getAllEmplois = function(req, res, next) {
    db.emplois.findAll()
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
    //res.send("GET ALL Emplois");
}

const getEmploisById = function(req, res, next) {
    db.emplois.findOne({where:{id_emploi:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
}


const editEmploi = function(req, res, next) {

    db.emplois.update(req.body,{where:{id_emploi:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

    res.send("EDIT Emploi BY ID " + req.params.id);
}

const deleteEmploi = function(req, res, next) {
        db.emplois.destroy({where:{id_emploi:req.params.id}})
        .then((response)=>res.status(202).send(response))
        .catch((err)=>res.status(400).send(err))
    

    res.send("DELETE Emploi BY ID " + req.params.id);
}
module.exports = {
    getAllEmplois,
    getEmploisById,
    addEmploi,
    editEmploi,
    deleteEmploi
}