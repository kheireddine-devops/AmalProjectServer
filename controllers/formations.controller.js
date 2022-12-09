
const db = require('../models')

//afficher all formations
const getAllFormations = function (req, res, next) {
    db.formation.findAll()
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))


}

// add une formation
const addFormation = function (req, res, next) {

    console.log(req.body)

        db.formation.create( {
            ...req.body,
            id_compte: req.user.id
        })
        .then((response)=>res.status(200).send(response))
        .catch((err)=>res.status(400).send(err))

}



//modifier annonce formation
const editFormation = function (req, res, next) {

    db.formation.update(req.body, { where: {id_formation : req.params.id } }).then((response) => {
        res.status(200).send(response)
    }).catch((err) => {
        res.status(400).send(err)
    })

}

//supprimer une formation
const deleteFormation = function (req, res, next) {

    db.formation.destroy(
        {
            where: { id_formation: req.params.id }
        }).then((response) => {
            res.status(200).send({response});
        })
        
        .catch((err) => res.status(400).send(err))
       

}


//get by id formation
 const getFormationById =function(req,res,next)
 {
    db.formation.findOne({ where:{id_formation:req.params.id}

    }).then((response)=> res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
 }
 
module.exports = {
    getAllFormations,
    addFormation,
    editFormation,
    deleteFormation,
    getFormationById
   

}