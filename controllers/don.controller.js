const initModels = require("./../models/init-models");
const db = require("./../models/index");
const {Op} = require("sequelize");
const models = initModels(db.sequelize);


//Ajouter Dons

const addDons = function(req, res, next) {
    db.dons.create(req.body)
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

}

//Afficher tous les dons

const getAllDons = function (req, res , next) {
    db.dons.findAll()
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
}

//Modifier dons

const modifyDons = function (req, res, next) {
    db.dons.update(req.body, {where: {id_dons : req.params.id} }).then((response) => {
        res.status(200).send(response)
    }).catch((err) => {
        res.status(400).send(err)
    }
    )
}

//Supprimer dons

const removeDons = function (req, res, next) {
    db.dons.destroy(
        {
            where: { id_dons: req.params.id}

        }).then((response)=> res.status(200).send({response}))
    .catch((err)=>res.status(400).send(err))
}


//Afficher dons avec ID

const getDonsById = function(req,res,next)
{
    db.dons.findOne({ where:{id_dons:req.params.id}
    }).then((response)=> res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
}

module.exports = {
    addDons,
    getAllDons,
    modifyDons,
    removeDons,
    getDonsById
}