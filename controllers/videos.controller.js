const { response } = require('express')
const express = require('express')
const route =express.Router()
const db =require('../models');
const server = require('../server');




//**************** */




  const onFileupload=  (req, res,next) => {
    let file = req['files'].thumbnail;
  
    console.log("File uploaded: ", file.name);

  }
const uploadVideo =  (req, res,next) => {
    db.video.create(req.bady)

        .then((response) => res.status(201).send(response))
        .catch((err) => res.status(400).send(err))

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
    deleteVideo,
    onFileupload

    
}