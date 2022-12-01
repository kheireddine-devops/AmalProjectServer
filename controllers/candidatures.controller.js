const db=require('../models')
const Joi=require('joi')
const {Op}=require('sequelize')
const CandidatureSchema=Joi.object({
    id_emploi:Joi.required(),
    id_compte:Joi.required(),
    date_candidature:Joi.date().required(),
    url_cv:Joi.string().required(),
    niveau:Joi.string().required(),
    message:Joi.string().required(),

 })


 const addCandidature = function(req, res, next) {
    const joiError=CandidatureSchema.validate(req.body)
    if(joiError.error){
        return res.status(400).send(joiError.error.details[0].message)
    }
    
    db.candidatures.create( req.body)
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
}


const getAllCandidatures = function(req, res, next) {
    db.candidatures.findAll()
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
    //res.send("GET ALL Emplois");
}

const getCandidatureById = function(req, res, next) {
    //res.send(req.params)
    let para=req.params
    db.candidatures.findOne({where:{[Op.and]:[{id_emploi:req.params.ide},{id_compte:req.params.idc }] }})   
   // db.candidatures.findOne({where:{id_emploi:req.params.ide}})   
    .then((response)=>res.status(200).send({response,para}))
    .catch((err)=>res.status(400).send(err))
}


const editCandidature = function(req, res, next) {

    db.candidatures.update(req.body,{where:{[Op.and]:[{id_emploi:req.params.ide},{id_compte:req.params.idc }] }})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

    res.send("EDIT Emploi BY ID " + req.params.id);
}

const deleteCandidature = function(req, res, next) {
        db.candidatures.destroy({where:{[Op.and]:[{id_emploi:req.params.ide},{id_compte:req.params.idc }] }})
        .then((response)=>res.status(202).send(response))
        .catch((err)=>res.status(400).send(err))
    

    res.send("DELETE Emploi BY ID " + req.params.id);
}
module.exports = {
    getAllCandidatures,
    getCandidatureById,
    addCandidature,
    editCandidature,
    deleteCandidature
}