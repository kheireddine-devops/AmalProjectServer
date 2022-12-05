const initModels = require("./../models/init-models");
const db = require("./../models/index");
const {Op} = require("sequelize");
const models = initModels(db.sequelize);
const {crypt} = require("./accounts.controller");

const addDoctor = async (req,res,next) => {

    try {
        const result = await db.sequelize.transaction(async transaction => {

            const _account = {
                id_compte : undefined,
                role : "ROLE_DOCTOR",
                status : "STATUS_ACTIVE_NOT_VERIFIED_PHONE_VERIFIED_MAIL",
                username : req.body.account.username,
                password : crypt(req.body.account.password),
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
                adresse: JSON.stringify(req.body.address)
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
        include: ["medecin","beneficier","benevole"],
        attributes: ['id_user',['nom','firstname'],['prenom','lastname'],['date_naissance','dateOfBirth'],['sexe','gender'],['adresse','address']]
    })
        .then(result => {
            res.status(200).send(result);
        }).catch((error) => {
        res.status(500).send(error);
    });
}

const getAllDoctors = (req,res,next) => {
    console.log(req.user.id)
    models.medecin.findAll({
        attributes: ['id_user',['matricule','matricule'],['specialite','specialty'],['cin','cin'],['assurance','assurance']]
    })
        .then(result => {
            res.status(200).send(result);
        }).catch((error) => {
        res.status(500).send(error);
    });
}

const getAllBeneficiers = (req,res,next) => {
    models.beneficier.findAll({
        attributes: ['id_user',['carte_handicap','carteHandicapNumber'],['date_expiration','dateExpiration']]
    })
        .then(result => {
            res.status(200).send(result);
        }).catch((error) => {
        res.status(500).send(error);
    });
}

const getAllOrganizations = (req,res,next) => {
    models.organisation.findAll({
        attributes: ['id_compte',['matricule_fiscale','matriculeFiscale'],['nom','name'],['forme_juridique','formeJuridique'],['adresse','address']]
    })
        .then(result => {
            res.status(200).send(result);
        }).catch((error) => {
        res.status(500).send(error);
    });
}

const getAllBenevoles = (req,res,next) => {
    models.benevole.findAll({
        attributes: ['id_user','profession']
    })
        .then(result => {
            res.status(200).send(result);
        }).catch((error) => {
        res.status(500).send(error);
    });
}

const getUserByID = (req,res,next) => {
    const _id = req.params.id;
    if(_id !== undefined) {
        models.user.findByPk(_id, {
            attributes: ['id_user',['nom','firstname'],['prenom','lastname'],['date_naissance','dateOfBirth'],['sexe','gender'],['adresse','address']]
        }).then(result => {
            console.log(result)
            console.log(eval(result.address));
            res.status(200).send(result);
        }).catch((error) => {
            next(error);
        });
    }
}

const getOrganizationByID = (req,res,next) => {
    const _id = req.params.id;
    if(_id !== undefined) {
        models.organisation.findByPk(_id, {
            attributes: ['id_compte',['matricule_fiscale','matriculeFiscale'],['nom','name'],['forme_juridique','formeJuridique'],['adresse','address']]
        }).then(result => {
            res.send(result);
        }).catch((error) => {
            next(error);
        });
    }
}

const getDoctorByID =  (req,res,next) => {
    const _id = req.params.id;
    if(_id !== undefined) {
        models.medecin.findByPk(_id,{
            attributes: ['id_user',['matricule','matricule'],['specialite','specialty'],['cin','cin'],['assurance','assurance']]
        }).then(result => {
            res.send(result);
        }).catch((error) => {
            next(error);
        });
    }
}

const getBenevoleByID =  (req,res,next) => {
    const _id = req.params.id;
    if(_id !== undefined) {
        models.benevole.findByPk(_id, {
            attributes: ['id_user','profession']
        }).then(result => {
            res.send(result);
        }).catch((error) => {
            next(error);
        });
    }
}

const getBeneficierByID =  (req,res,next) => {
    const _id = req.params.id;
    if(_id !== undefined) {
        models.beneficier.findByPk(_id, {
            attributes: ['id_user',['carte_handicap','carteHandicapNumber'],['date_expiration','dateExpiration']]
        }).then(result => {
            res.send(result);
        }).catch((error) => {
            next(error);
        });
    }
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
    getUserByID,
    getDoctorByID,
    getBeneficierByID,
    getOrganizationByID,
    getBenevoleByID,
    existsDoctorByCIN,
    existsDoctorByMatricule,
    existsOrganizationByMatricule,
    existsBeneficierByCarteHandicapNumber,
}