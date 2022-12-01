const initModels = require("./../models/init-models");
const db = require("./../models/index");
const {Op} = require("sequelize");
const models = initModels(db.sequelize);

const addDoctor = (req,res,next) => {

    const _account = req.body.account;
    _account.id_compte = undefined;
    _account.role = "ROLE_DOCTOR";
    _account.status = "STATUS_ACTIVE_NOT_VERIFIED_PHONE_VERIFIED_MAIL";

    const _accountModel = new models.compte(_account);

    _accountModel.save()
        .then(accountResult => {

            const _user = {
                id_user: accountResult.id_compte,
                nom: req.body.firstname,
                prenom: req.body.lastname,
                date_naissance: req.body.dateOfBirth,
                sexe: req.body.gender,
                adresse: req.body.address.city
            }
            const _userModel = new models.user(_user);
            _userModel.save()
                .then(userResult => {
                    const _doctor = {
                        id_user: accountResult.id_compte,
                        cin : req.body.cin,
                        assurance: req.body.assurance.join(","),
                        matricule: req.body.matricule,
                        specialite: req.body.specialty
                    }
                    console.log(_doctor);
                    const _doctorModel = new models.medecin(_doctor);
                    _doctorModel.save()
                        .then(doctorResult => {
                            res.status(200).send({
                                user: userResult,
                                account: accountResult,
                                doctor: doctorResult
                            });
                        })
                        .catch((error) => {
                            res.status(500).send(error);
                        });
                })
                .catch(error => {
                    res.status(500).send(error);
                })
        }).catch((error) => {
        res.status(500).send(error);
    });
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