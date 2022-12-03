const { response } = require('express')
const express = require('express')
const route = express.Router()
const db = require('../models')


//afficher tous les playlistes

const getAllPlaylists = function (req, res, next) {

    db.playlist.findAll({
        // where:{include:[db.video] ,include:[db.compte] }
    })

        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

}

// afficher playliste par id avec les videos

const getPlaylist = function (req, res, next) {

    db.playlist.findOne({ 
        where: { id_playlist: req.params.id ,include:[db.video] ,include:[db.compte]  }
    
    })

        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

}

//ajouter une playliste

const addPlaylist = function (req, res, next) {

    db.playlist.create(req.bady)

        .then((response) => res.status(201).send(response))
        .catch((err) => res.status(400).send(err))

}


//modifier le nom de playliste
const editPlaylist = function (req, res, next) {

    db.playlist.update(req.body, { where: { id: req.params.id } ,include:[db.compte] })
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
            where: { id: req.params.id }
        }).then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

}



module.exports = {
    getAllPlaylists,
    addPlaylist,
    getPlaylist,
    editPlaylist,
    deletePlaylist,

}