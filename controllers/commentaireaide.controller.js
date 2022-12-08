var express = require('express');
var db = require('../models');
const {Op, QueryTypes} = require("sequelize");
const addCommentaireaide = function(req,res,next){
    db.commentaireaide.create({
        txtCommentaire:req.body.txtCommentaire,
        dateCommentaire :Date.now(),
        like : 0,
        status:req.body.status,
        idCompte :1,
        idDemandeAide:req.body.idDemandeAide,
    

    }).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

}
const getCommentaireaide = function(req,res,next){
    db.sequelize.query("SELECT D.*, U.nom,U.prenom,C.photo FROM commentaireaide AS D JOIN compte AS C ON C.id_compte = D.idCompte JOIN user AS U ON U.id_user = D.idCompte;", { type: QueryTypes.SELECT })
        .then(result => {
            res.status(200).send(result);
        }).catch((error) => {
             res.status(500).send(error);
    });

}
const getCommentaireById = function (req,res,next){
    db.sequelize.query("SELECT D.*, U.nom,U.prenom,C.photo FROM commentaireaide AS D JOIN compte AS C ON C.id_compte = D.idCompte JOIN user AS U ON U.id_user = D.idCompte where D.idDemandeAide=:id;", { replacements: { id: req.params.id },type: QueryTypes.SELECT })
    .then(result => {
        res.status(200).send(result);
    }).catch((error) => {
         res.status(500).send(error);
});
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
