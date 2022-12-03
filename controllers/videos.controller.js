const { response } = require('express')
const express = require('express')
const route =express.Router()
const db =require('../models')



//upload un video

const uploadVideo = function(req, res, next) {
    
    
    
}

//supprimer video
const deleteVideo = function(req, res, next) {
    db.video.destroy(
        { where:{id:req.params.id} 
    }).then((response)=> res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

}



module.exports = {
  
    uploadVideo,
    deleteVideo
}