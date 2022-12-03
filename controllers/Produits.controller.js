const initModels = require("./../models/init-models");
const db = require("./../models/index");
const models = initModels(db.sequelize);
const ProduitValidator = require("./../validators/produit.validator");
const { message } = require("./../validators/produit.validator");

/**************Affichage***************/
const getOneProduit =(req,res,next)=>{
    console.log(req.params.id)
    models.produit.findOne({
        where:{id_produit:req.params.id}})
    .then((response)=>res.send(response))
    .catch((err)=> res.status(400).send(err))
}



const getAllProduits = (req,res,next)=>{
    models.produit.findAll({include:["avis"]})
        .then((response)=>res.status(200).send(response))
        .catch((err)=> res.status(400).send(err))
    }

   /************ Create **************/

const addProduit = (req,res,next)=>{
    dateSys = new Date().getTime();
    const produitData = ProduitValidator.validate({
        libelleP:req.body.libelleP,
       
        prixP: req.body.prixP,
        descriptionP: req.body.descriptionP,
        photoP: req.body.photoP,
        numVendeur: req.body.numVendeur,
        cathegorie: req.body.cathegorie
    })


    if(produitData.error === undefined) {

        models.produit.create({
            ...produitData.value,
            dateP: dateSys,
            id_beneficier: 3
        }).then((response)=>res.status(200).send(response))
        .catch((err)=> res.status(400).send(err))
    } else {
        res.status(401).send(produitData.error.details)
    }
}

/***************Update****************/

const editProduit = (req,res,next)=>{
    //dateSys = new Date().getTime();
const produitData = ProduitValidator.validate({
  
        libelleP:req.body.libelleP,
        prixP: req.body.prixP,
        descriptionP: req.body.descriptionP,
        photoP: req.body.photoP,
        numVendeur: req.body.numVendeur,
        cathegorie: req.body.cathegorie,
       // dateP: req.body.dateP,
    })
    if(produitData.error === undefined) {
        models.produit.update({
            ...produitData.value,
            dateP : new Date().getTime(),
            id_beneficier: 3
        },{where:{id_produit:req.params.id}}).then((response)=>res.status(200).send(response))
        .catch((err)=> res.status(400).send(err))
    } else {
        res.status(401).send(produitData.error.details)
    }
}

/**********delete*********/

const deleteProduit = (req,res,next)=>{
    models.produit.destroy({where:{id_produit:req.params.id}})
    .then((response)=>{res.send("removed")})
    .catch((err)=>{res.status(400).send(err)})
}



module.exports = {
    getOneProduit,
    getAllProduits,
    addProduit,
    editProduit,
    deleteProduit
}