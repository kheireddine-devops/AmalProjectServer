const db=require('../models')
const jwt_decode = require('jwt-decode');
const validator=require('../validators/validator')
 const addEmploi = function(req, res, next) {
    const role = jwt_decode(req.header('authorization')).role;
    if(role=='ROLE_ORGANIZATION'){
        req.body['id_compte'] = jwt_decode(req.header('authorization')).sub
    }
    const joiError=validator.EmploiSchema.validate(req.body)
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
    const joiError=validator.EmploiSchema.validate(req.body)
    console.log(req.params.id)
    if(joiError.error){
        return res.status(400).send(joiError.error.details[0].message)
    }
    db.emplois.update(req.body,{where:{id_emploi:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

    //res.send("EDIT Emploi BY ID " + req.params.id);
}

const deleteEmploi = function(req, res, next) {
        db.emplois.destroy({where:{id_emploi:req.params.id}})
        .then((response)=>res.status(200).send(JSON.stringify("deleted")))
        .catch((err)=>res.status(400).send(err))

    //res.send("DELETE Emploi BY ID " + req.params.id);
}
module.exports = {
    getAllEmplois,
    getEmploisById,
    addEmploi,
    editEmploi,
    deleteEmploi
}