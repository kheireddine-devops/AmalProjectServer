const initModels = require("./../models/init-models");
const db = require("./../models/index");
const {Op} = require("sequelize");
const models = initModels(db.sequelize);

const getAllAccounts = (req,res,next) => {
    models.compte.findAll({
        include: ["user", "organisation"]
    })
        .then(result => {
            res.status(200).send(result);
        }).catch((error) => {
        res.status(500).send(error);
    });
};

module.exports = {
    getAllAccounts
}
