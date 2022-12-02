var express = require('express');
var db = require('../models');
const addCommentaireaide = function(req,res,next){
    db.commentaireaide.create({
        txtCommentaire:body.req.txtCommentaire,
        dateCommentaire:Date.now(),
        like :body.req.like,
        status :body.req.status,
        idCompte:body.req.idCompte,
        idDemandeAide: body.req.idDemandeAide


    }).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

}
const getCommentaireaide = function(req,res,next){
    db.commentaireaide.findAll().then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))


}
const updateCommentaireaide = function (req,res,next){
    db.commentaireaide.update({
        txtCommentaire:body.req.txtCommentaire,
        dateCommentaire:Date.now(),
        like :body.req.like,
        status :body.req.status,
        idCompte:body.req.idCompte,
        idDemandeAide: body.req.idDemandeAide 

    },{where:{idCommentaire:req.params.id}}).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

}
const deleteCommentaireaide= function(req,res,next){
    db.commentaireaide.destroy({where:{idCommentaire:req.params.id} 
    }).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))


}
module.exports = {
    addCommentaireaide,
    getCommentaireaide,
    updateCommentaireaide,
    deleteCommentaireaide

   
}
