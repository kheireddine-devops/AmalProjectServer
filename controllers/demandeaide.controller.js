var express = require('express');
const db = require('../models');
const Joi =require('joi');
// validation Scheme

const DemandeSchema = Joi.object({
    typeDemande:Joi.string().required(),
    sujet:Joi.string().min(20).required(),
    nombre:Joi.number().required(),
    contenue:Joi.string().min(100).required(),
    date_publication:Joi.date(),
    image:Joi.string(),
    Status:Joi.string(),
    id_user:Joi.required()

})
exports.register=(typeDemande,sujet,nombre,contenue,date_publication,image,Status,id_user)=>{
    return new Promise((resolve,reject)=>{
        let validation = DemandeSchema.validate({typeDemande,sujet,nombre,contenue,date_publication,image,Status,id_user})
        if(validation.error){
            reject(validation.error.details[0].message)
        }
        db.demandeaide.create({
            typeDemande:typeDemande,
            sujet:sujet,
            nombre:nombre,
            contenue:contenue,
            date_publication:date_publication,
            image:image,
            Status:Status,
            id_user:id_user
    
        }).then((response)=>resolve(response))
        .catch((err)=>reject(err))
    
    })
}

const addDemande = function(req,res,next){
    db.demandeaide.create({
        typeDemande:req.body.typeDemande,
        sujet:req.body.sujet,
        nombre:req.body.nombre,
        contenue:req.body.contenue,
        date_publication:Date.now(),
        image:req.body.image,
        Status:req.body.Status,
        id_user:3

    }).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

}
const getDemandeById = function (req,res,next){
    db.demandeaide.findOne({where:{id_demande_aide:req.params.id},include:[db.commentaireaide]
    }).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))


}
const getDemande = function(req,res,next){
    db.demandeaide.findAll().then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))


}
const updateDemande = function (req,res,next){
    db.demandeaide.update({
        typeDemande:req.body.typeDemande,
        sujet:req.body.sujet,
        nombre:req.body.nombre,
        contenue:req.body.contenue,
        date_publication:req.body.date_publication,
        image:req.body.image,
        Status:req.body.Status,
        

    },{where:{id_demande_aide:req.params.id}}).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

}
const deleteDemande= function(req,res,next){
    db.demandeaide.destroy({where:{id_demande_aide:req.params.id} 
    }).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))


}
module.exports = {
    addDemande,
    getDemandeById,
    getDemande,
    updateDemande,
    deleteDemande
}