const { response } = require('express')
const express = require('express')
const route =express.Router()
const db =require('../models');
const server = require('../server');




//**************** */
const getAllVideos=  (req, res,next) => {
  db.video.findAll()

      .then((response) => res.status(200).send(response))
      .catch((err) => res.status(400).send(err))

}

//afficher playliste par id avec les videos

const getVideoById =  function (req, res, next) {
   
    db.video.findOne({
// SELECT V.*, P.Nom_playlist FROM video AS V JOIN playlist AS P ON V.id_playlist = P.id_playlist where p.id_playlist=1;
   
where:{[Op.and]:[{id_video :req.params.id}] }})   
        // where:{id_playlist:req.params.id}

        .then((response)=>res.status(200).send(response))
        .catch((err)=>res.status(400).send(err))
    
}




  

const uploadVideo =  (req, res,next) => {

  console.log(req.file.filname);
  req.body = JSON.parse(req.body.video);
  
    db.video.create({
      url: req.file.filename,
      titre: req.body.titre,
      id_playlist: 1
      })

        .then((response) => res.status(201).send(response))
        .catch((err) => res.status(400).send(err))

     }
 


//supprimer video
const deleteVideo = function(req, res, next) {
    db.video.destroy(
        { where:{id_video:req.params.id} 
    }).then((response)=> res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

}



module.exports = {
  
    uploadVideo,
    deleteVideo,
    getAllVideos,
    getVideoById

    
}