const initModels = require("./../models/init-models");
const db = require("./../models/index");
const models = initModels(db.sequelize);
const Joi=require('joi')
const {Op, QueryTypes} = require("sequelize");
const validator=require('../validators/validator')

 const addCandidature = function(req, res, next) {
    const joiError=validator.CandidatureSchema.validate(req.body)
    if(joiError.error){
        return res.status(400).send(joiError.error.details[0].message)
    }
    
    models.candidatures.create( req.body
    //     {
    //     ...req.body,
    //     id_compte: req.user.id
    // }
    )
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
}


const getAllCandidatures = function(req, res, next) {
    // models.candidatures.findAll({ include:{all:true}})
    // .then((response)=>res.status(200).send(response))
    // .catch((err)=>res.status(400).send(err))
    //res.send("GET ALL Emplois");
    db.sequelize.query("SELECT CA.*, E.*,U.* FROM candidatures AS CA JOIN emplois AS E ON CA.id_emploi = E.id_emploi JOIN user AS U ON U.id_user = CA.id_compte;", { type: QueryTypes.SELECT })
     
    //db.sequelize.query("SELECT CA.*, E.ref_emploi,U.nom,U.prenom FROM candidatures AS CA JOIN emplois AS E ON CA.id_emploi = E.id_emploi JOIN user AS U ON U.id_user = CA.id_compte;", { type: QueryTypes.SELECT })
    .then(result => {
        res.status(200).send(result);
    }).catch((error) => {
         res.status(500).send(error);
});
}

const getCandidatureById = function(req, res, next) {
    //res.send(req.params)
    let para=req.params
    models.candidatures.findOne({where:{[Op.and]:[{id_emploi:req.params.ide},{id_compte:req.params.idc }] }})   
   // db.candidatures.findOne({where:{id_emploi:req.params.ide}})   
    .then((response)=>res.status(200).send({response,para}))
    .catch((err)=>res.status(400).send(err))
}


const editCandidature = function(req, res, next) {
    const joiError=validator.CandidatureSchema.validate(req.body)
    if(joiError.error){
        return res.status(400).send(joiError.error.details[0].message)
    }

    models.candidatures.update(req.body,{where:{[Op.and]:[{id_emploi:req.params.ide},{id_compte:req.params.idc }] }})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

    res.send("EDIT Emploi BY ID " + req.params.id);
}

const deleteCandidature = function(req, res, next) {
    models.candidatures.destroy({where:{[Op.and]:[{id_emploi:req.params.ide},{id_compte:req.params.idc }] }})
        .then((response)=>res.status(202).send(response))
        .catch((err)=>res.status(400).send(err))
    

    res.send("DELETE Emploi BY ID " + req.params.ide);
}
module.exports = {
    getAllCandidatures,
    getCandidatureById,
    addCandidature,
    editCandidature,
    deleteCandidature
}