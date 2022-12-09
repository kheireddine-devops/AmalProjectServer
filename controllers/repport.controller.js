const initModels = require("./../models/init-models");
const db = require("./../models/index");
const {Op} = require("sequelize");
const rapport = require("../models/rapport");
const models = initModels(db.sequelize);


//Ajouter Rapport

const addReport = function(req, res, next) {
    models.rapport.create(req.body)
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

}

//Afficher tous les rapports

const getAllReport = function (req, res , next) {
    db.rapport.findAll()
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
}

//Modifier Rapports 

const modifyReport = function (req, res, next) {
    db.rapport.update(req.body, {where: {id_rapport : req.params.id} })
    .then((response) => {
        res.status(200).send({response})
    }).catch((err) => {
        res.status(400).send(err)
    }
    )
}

//Supprimer Rapport

const removeReport = function (req, res, next) {
    db.rapport.destroy(
        {
            where: { id_rapport: req.params.id}

        }).then((response)=> res.status(200).send({response}))
    .catch((err)=>res.status(400).send(err))
}

//Afficher rapport avec ID

const getReportById = function(req,res,next)
{
    db.rapport.findOne({ where:{id_rapport:req.params.id}
    }).then((response)=> res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
}


module.exports = {
    addReport,
    getReportById,
    getAllReport,
    modifyReport,
    removeReport
    
}