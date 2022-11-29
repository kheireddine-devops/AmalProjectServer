const initModels = require("./../models/init-models");
const db = require("./../models/index");
const {Op} = require("sequelize");
const models = initModels(db.sequelize);

const getAllUsers = (req,res,next) => {
    models.user.findAll({
        include: ["medecin","beneficier","benevole"]
    })
        .then(result => {
            res.status(200).send(result);
        }).catch((error) => {
        res.status(500).send(error);
    });
}

const getAllDoctors = (req,res,next) => {
    res.send("GET ALL DOCTORS");
}

const getAllBeneficiers = (req,res,next) => {
    res.send("GET ALL BENEFICIERS");
}

const getAllOrganizations = (req,res,next) => {
    res.send("GET ALL ORGANIZATIONS");
}

const getAllBenevoles = (req,res,next) => {
    res.send("GET ALL BENEVOLES");
}

const existsUserByUsername =  (req,res,next) => {
    const _username = req.body.username;
    if (_username !== undefined) {
        const query = {};
        query.login = { [Op.eq] : _username };
        models.compte.count({
            where: query
        }).then(result => {
            res.status(200).send(result !== 0);
        }).catch((error) => {
            res.status(500).send(error);
        });
    } else {
        next();
    }
}

module.exports = {
    getAllUsers,
    getAllDoctors,
    getAllBeneficiers,
    getAllOrganizations,
    getAllBenevoles,
    existsUserByUsername
}