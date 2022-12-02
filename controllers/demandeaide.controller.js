var express = require('express');
var route = express.Router()
var db = require('../models');

const addDemande = function(req,res,next){
    db.demandeaide.create({
        typeDemande:req.body.typeDemande,
        sujet:req.body.sujet,
        nombre:req.body.nombre,
        contenue:req.body.contenue,
        date_publication:req.body.date_publication,
        image:req.body.image,
        Status:req.body.Status,
        id_user:req.body.id_user

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
        id_user:req.body.id_user

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