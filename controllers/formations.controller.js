const getAllFormations = function(req, res, next) {
    res.send("GET ALL FORMATIONS");
}

const addFormation = function(req, res, next) {
    res.send("ADD FORMATION");
}

const editFormation = function(req, res, next) {

    res.send("EDIT FORMATION BY ID " + req.params.id);
}

const deleteFormation = function(req, res, next) {
    res.send("DELETE FORMATION BY ID " + req.params.id);
}



module.exports = {
    getAllFormations,
    addFormation,
    editFormation,
    deleteFormation
}