const { response } = require('express')
const express = require('express')
const route = express.Router()
const initModels = require("./../models/init-models");
const db = require('../models')
const models = initModels(db.sequelize);
const video = require('../models/video')


//afficher tous les playlistes

const getAllPlaylists = function (req, res, next) {

    db.playlist.findAll({
        
    })

        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

}

// afficher playliste par id avec les videos

const getPlaylistById = function (req, res, next) {
   
    db.playlist.findOne({
       
        where:{id_playlist:req.params.id,include:[db.video]}
        }).then((response)=>res.status(200).send(response))
        .catch((err)=>res.status(400).send(err))
    
}



//ajouter une playliste

const addPlaylist = function (req, res, next) {
    dateSystem = new Date().getTime(); 
   

    db.playlist.create({

        Nom_playlist:req.body.Nom_playlist,
        date_create:Date.now(),
        id_compte : req.body.id_compte
   

    })

        .then((response) => res.status(201).send(response))
        .catch((err) => res.status(400).send(err))

}


//modifier le nom de playliste
const editPlaylist = function (req, res, next) {

    db.playlist.update( 
        
   {Nom_playlist:req.body.Nom_playlist},       
  {  where: { id_playlist: req.params.id } 
       
        })
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((err) => {
            res.status(400).send(err)
        })

}

//supprimer la playliste
const deletePlaylist = function (req, res, next) {

    db.playlist.destroy(
        {
            where: { id_playlist: req.params.id }
        }).then((response) => 
        {
            res.status(200).send({response});
        })
        .catch((err) => res.status(400).send(err))

}



module.exports = {
    getAllPlaylists,
    addPlaylist,
    getPlaylistById,
    editPlaylist,
    deletePlaylist,

}