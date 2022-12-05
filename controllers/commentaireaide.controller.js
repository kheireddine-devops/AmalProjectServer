var express = require('express');
var db = require('../models');
const addCommentaireaide = function(req,res,next){
    db.commentaireaide.create({
        txtCommentaire:req.body.txtCommentaire,
        dateCommentaire:Date.now(),
        like : 0,
        status :"non publié",
        idCompte:req.body.idCompte,
        idDemandeAide: req.body.idDemandeAide


    }).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

}
const getCommentaireaide = function(req,res,next){
    db.commentaireaide.findAll().then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))


}
const getCommentaireById = function (req,res,next){
    db.commentaireaide.findOne({where:{idCommentaire:req.params.id}
    }).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))


}
const getCommentaireDemande = function (req,res,next){
    db.commentaireaide.findAll({where:{idDemandeAide:req.params.iddemande}
    }).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))


}
const updateCommentaireaide = function (req,res,next){
    db.commentaireaide.update({
        txtCommentaire:req.body.txtCommentaire,
        dateCommentaire:Date.now(),
        like :req.body.like,
        status :req.body.status,
        idCompte:req.body.idCompte,
        idDemandeAide: req.body.idDemandeAide,
        idCommentaire:req.body.idCommentaire

    },{where:{idCommentaire:req.params.id}}).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

}
const deleteCommentaireaide = function(req,res,next){
    db.commentaireaide.destroy({where:{idCommentaire:req.params.id} 
    }).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))


}
module.exports = {
    addCommentaireaide,
    getCommentaireaide,
    updateCommentaireaide,
    deleteCommentaireaide,
    getCommentaireDemande,
    getCommentaireById
   
}
