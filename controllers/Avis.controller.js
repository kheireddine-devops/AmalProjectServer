const initModels = require("./../models/init-models");
const db = require("./../models/index");
const {Op} = require("sequelize");
const models = initModels(db.sequelize);
const AvisValidator = require("./../validators/avis.validator");

/******************Create*****************/

const addAvis = (req,res,next)=>{
    dateSys = new Date().getTime(); 
    const avisData = AvisValidator.validate({
        text:req.body.text,
    })
    if(avisData.error === undefined) {
    models.avis.create({
        ...avisData.value,
        dateA: dateSys,
        id_produit: req.body.id_produit,
        id_compte: req.body.id_compte,
    }).then((response)=>res.status(200).send(response))
    .catch((err)=> res.status(400).send(err))
    } else {
        res.status(401).send(avisData.error.details)
    }
}

/****************Affichage***************/

const getAllAvis = (req,res,next)=>{
    models.avis.findAll({include:["produit","compte"]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=> res.status(400).send(err))
}

/***************Update****************/
const editAvis = (req,res,next)=>{
    const avisData = AvisValidator.validate({
        text:req.body.text,
    })
    if(avisData.error === undefined){
        models.avis.update({
            text:req.body.text
        },{where:{id_avis:req.params.id }})
        .then((response)=>res.status(200).send(response))
        .catch((err)=> res.status(400).send(err))
    }
    else{
        res.status(401).send(avisData.error.details)
    }
}

/**********delete*********/

const deleteAvis = (req,res,next)=>{
        models.avis.destroy({where:{id_avis:req.params.id}})
        .then((response)=>{res.send("removed")})
        .catch((err)=>{res.status(400).send(err)})

}


module.exports = {
    addAvis,
    getAllAvis,
    editAvis,
    deleteAvis
}