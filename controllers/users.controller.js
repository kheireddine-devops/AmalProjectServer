const initModels = require("./../models/init-models");
const db = require("./../models/index");
const {Op} = require("sequelize");
const models = initModels(db.sequelize);

const addDoctor = async (req,res,next) => {

    try {
        const result = await db.sequelize.transaction(async transaction => {

            const _account = {
                id_compte : undefined,
                role : "ROLE_DOCTOR",
                status : "STATUS_ACTIVE_NOT_VERIFIED_PHONE_VERIFIED_MAIL",
                username : req.body.account.username,
                password : req.body.account.password,
                email : req.body.account.email,
                phone : req.body.account.phone,
            }

            const _accountModel = await models.compte.create(_account, { transaction});

            const _user = {
                id_user: _accountModel.id_compte,
                nom: req.body.firstname,
                prenom: req.body.lastname,
                date_naissance: req.body.dateOfBirth,
                sexe: req.body.gender,
                adresse: req.body.address.city
            }

            const _userModel = await models.user.create(_user, { transaction});

            const _doctor = {
                id_user: _accountModel.id_compte,
                cin : req.body.cin,
                assurance: req.body.assurance.join(","),
                matricule: req.body.matricule,
                specialite: req.body.specialty
            }

            const _doctorModel = await models.medecin.create(_doctor, { transaction });

            return {
                user: _userModel,
                account: _accountModel,
                doctor: _doctorModel
            }
        })
        res.status(201).send(result);
    } catch (e) {
        res.status(500).send(e);
    }

}

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
    models.medecin.findAll()
        .then(result => {
            res.status(200).send(result);
        }).catch((error) => {
        res.status(500).send(error);
    });
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

const existsDoctorByCIN = (req,res,next) => {
    const _cin = req.body.cin;
    if (_cin !== undefined) {
        const query = {};
        query.cin = { [Op.eq] : _cin };
        models.medecin.count({
            where: query
        }).then(result => {
            res.status(200).send(result !== 0);
        }).catch((error) => {
            res.status(500).send(error);
        });
    }
}

const existsDoctorByMatricule = (req,res,next) => {
    const _matricule = req.body.matricule;
    if (_matricule !== undefined) {
        const query = {};
        query.matricule = { [Op.eq] : _matricule };
        models.medecin.count({
            where: query
        }).then(result => {
            res.status(200).send(result !== 0);
        }).catch((error) => {
            res.status(500).send(error);
        });
    }
}

const existsOrganizationByMatricule = (req,res,next) => {
    const _matricule = req.body.matricule;
    if (_matricule !== undefined) {
        const query = {};
        query.matricule_fiscale = { [Op.eq] : _matricule };
        models.organisation.count({
            where: query
        }).then(result => {
            res.status(200).send(result !== 0);
        }).catch((error) => {
            res.status(500).send(error);
        });
    }
}

const existsBeneficierByCarteHandicapNumber = (req,res,next) => {
    const _carteHandicapNumber = req.body.carteHandicapNumber;
    if (_carteHandicapNumber !== undefined) {
        const query = {};
        query.carte_handicap = { [Op.eq] : _carteHandicapNumber };
        models.beneficier.count({
            where: query
        }).then(result => {
            res.status(200).send(result !== 0);
        }).catch((error) => {
            res.status(500).send(error);
        });
    }
}

module.exports = {
    addDoctor,
    getAllUsers,
    getAllDoctors,
    getAllBeneficiers,
    getAllOrganizations,
    getAllBenevoles,
    existsDoctorByCIN,
    existsDoctorByMatricule,
    existsOrganizationByMatricule,
    existsBeneficierByCarteHandicapNumber
}