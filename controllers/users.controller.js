const initModels = require("./../models/init-models");
const db = require("./../models/index");
const {Op, QueryTypes} = require("sequelize");
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

const addBeneficier = async (req,res,next) => {

    try {
        const result = await db.sequelize.transaction(async transaction => {

            const _account = {
                id_compte : undefined,
                role : "ROLE_BENEFICIER",
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

            const _beneficier = {
                id_user: _accountModel.id_compte,
                carte_handicap: req.body.carteHandicapNumber,
                date_expiration: req.body.dateExpiration
            }

            const _beneficierModel = await models.beneficier.create(_beneficier, { transaction });

            return {
                user: _userModel,
                account: _accountModel,
                beneficier: _beneficierModel
            }
        })
        res.status(201).send(result);
    } catch (e) {
        res.status(500).send(e);
    }

}

const addBenevole = async (req,res,next) => {

    try {
        const result = await db.sequelize.transaction(async transaction => {

            const _account = {
                id_compte : undefined,
                role : "ROLE_BENEVOLE",
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

            const _benevole = {
                id_user: _accountModel.id_compte,
                profession: req.body.profession,
            }

            const _benevoleModel = await models.benevole.create(_benevole, { transaction });

            return {
                user: _userModel,
                account: _accountModel,
                benevole: _benevoleModel
            }
        })
        res.status(201).send(result);
    } catch (e) {
        res.status(500).send(e);
    }

}

const addOrganization = async (req,res,next) => {
    try {
        const result = await db.sequelize.transaction(async transaction => {

            const _account = {
                id_compte : undefined,
                role : "ROLE_ORGANIZATION",
                status : "STATUS_ACTIVE_NOT_VERIFIED_PHONE_VERIFIED_MAIL",
                username : req.body.account.username,
                password : crypt(req.body.account.password),
                email : req.body.account.email,
                phone : req.body.account.phone,
            }

            const _accountModel = await models.compte.create(_account, { transaction});


            const _organization = {
                id_compte: _accountModel.id_compte,
                nom: req.body.name,
                matricule_fiscale: req.body.matriculeFiscale,
                forme_juridique: req.body.formeJuridique,
                adresse: JSON.stringify(req.body.address)
            }

            const _organizationModel = await models.organisation.create(_organization, { transaction });

            return {
                account: _accountModel,
                organization: _organizationModel
            }
        })
        res.status(201).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
}

const editDoctor = async (req,res,next) => {

    const _id = req.params.id;
    if(_id !== undefined) {
        try {
            const result = await db.sequelize.transaction(async transaction => {

                const _updatedAccount = {
                    username : req.body.account.username,
                    password : (req.body.account.password) ? crypt(req.body.account.password): undefined,
                    email : req.body.account.email,
                    phone : req.body.account.phone,
                    photo: req.body.account.photo
                }

                const _accountModel = await models.compte.update(_updatedAccount, { where: { id_compte : _id } , updateOnDuplicate: ["phone","email","username"] },{ transaction});
                const _updatedUser = {
                    id_user: _accountModel.id_compte,
                    nom: req.body.firstname,
                    prenom: req.body.lastname,
                    date_naissance: req.body.dateOfBirth,
                    sexe: req.body.gender,
                    adresse: JSON.stringify(req.body.address)
                }

                const _userModel = await models.user.update(_updatedUser, { where: { id_user : _id } }, { transaction });

                const _updatedDoctor = {
                    cin : req.body.cin,
                    assurance: req.body.assurance.join(","),
                    matricule: req.body.matricule,
                    specialite: req.body.specialty
                }

                const _doctorModel = await models.medecin.update(_updatedDoctor, { where: { id_user : _id } , updateOnDuplicate: ["cin","matricule"] } , { transaction });

                return {
                    user: _userModel,
                    account: _accountModel,
                    doctor: _doctorModel
                }
            })
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send(e);
        }
    }
}

const editBeneficier = async (req,res,next) => {

    const _id = req.params.id;
    if(_id !== undefined) {
        try {
            const result = await db.sequelize.transaction(async transaction => {

                const _updatedAccount = {
                    username : req.body.account.username,
                    password : (req.body.account.password) ? crypt(req.body.account.password): undefined,
                    email : req.body.account.email,
                    phone : req.body.account.phone,
                    photo: req.body.account.photo
                }

                const _accountModel = await models.compte.update(_updatedAccount, { where: { id_compte : _id } , updateOnDuplicate: ["phone","email","username"] },{ transaction});
                const _updatedUser = {
                    id_user: _accountModel.id_compte,
                    nom: req.body.firstname,
                    prenom: req.body.lastname,
                    date_naissance: req.body.dateOfBirth,
                    sexe: req.body.gender,
                    adresse: JSON.stringify(req.body.address)
                }

                const _userModel = await models.user.update(_updatedUser, { where: { id_user : _id } }, { transaction });

                const _updatedBeneficier = {
                    carte_handicap : req.body.carteHandicapNumber,
                    date_expiration : req.body.dateExpiration
                }

                const _beneficierModel = await models.beneficier.update(_updatedBeneficier, { where: { id_user : _id } , updateOnDuplicate: ["carte_handicap"] } , { transaction });

                return {
                    user: _userModel,
                    account: _accountModel,
                    beneficier: _beneficierModel
                }
            })
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send(e);
        }
    }
}

const editBenevole = async (req,res,next) => {

    const _id = req.params.id;
    if(_id !== undefined) {
        try {
            const result = await db.sequelize.transaction(async transaction => {

                const _updatedAccount = {
                    username : req.body.account.username,
                    password : (req.body.account.password) ? crypt(req.body.account.password): undefined,
                    email : req.body.account.email,
                    phone : req.body.account.phone,
                    photo: req.body.account.photo,
                }

                const _accountModel = await models.compte.update(_updatedAccount, { where: { id_compte : _id } , updateOnDuplicate: ["phone","email","username"] },{ transaction});
                const _updatedUser = {
                    id_user: _accountModel.id_compte,
                    nom: req.body.firstname,
                    prenom: req.body.lastname,
                    date_naissance: req.body.dateOfBirth,
                    sexe: req.body.gender,
                    adresse: JSON.stringify(req.body.address)
                }

                const _userModel = await models.user.update(_updatedUser, { where: { id_user : _id } }, { transaction });

                const _updatedBenevole = {
                    profession : req.body.profession,
                }

                const _benevoleModel = await models.benevole.update(_updatedBenevole, { where: { id_user : _id } } , { transaction });

                return {
                    user: _userModel,
                    account: _accountModel,
                    benevole: _benevoleModel
                }
            })
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send(e);
        }
    }
}

const editOrganization = async (req,res,next) => {

    const _id = req.params.id;
    if(_id !== undefined) {
        try {
            const result = await db.sequelize.transaction(async transaction => {

                const _updatedAccount = {
                    username : req.body.account.username,
                    password : (req.body.account.password) ? crypt(req.body.account.password): undefined,
                    email : req.body.account.email,
                    phone : req.body.account.phone,
                    photo: req.body.account.photo,
                }

                const _accountModel = await models.compte.update(_updatedAccount, { where: { id_compte : _id } , updateOnDuplicate: ["phone","email","username"] },{ transaction});
                const _updatedOrganization = {
                    id_compte: _accountModel.id_compte,
                    nom: req.body.name,
                    matricule_fiscale: req.body.matriculeFiscale,
                    forme_juridique: req.body.formeJuridique,
                    adresse: JSON.stringify(req.body.address)
                }

                const _organizationModel = await models.organisation.update(_updatedOrganization, { where: { id_compte : _id } , updateOnDuplicate: ["matricule_fiscale"] }, { transaction });

                return {
                    organization: _organizationModel,
                    account: _accountModel,
                }
            })
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send(e);
        }
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
    /*console.log(req.user.id)*/
    models.medecin.findAll({
        attributes: ['id_user',['matricule','matricule'],['specialite','specialty'],['cin','cin'],['assurance','assurance']]
    })
        .then(result => {
            console.log(result.assurance)
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

const editAccountPhoto = (req,res,next) => {

    const _id = req.params.id;
    if(_id !== undefined) {
        models.compte.update({photo:  req.file.filename}, { where: { id_compte : _id } })
        .then(value => {
            res.send({
                valid: true,
                name: req.file.filename
            })
        }).catch((error) => {
            res.status(500).send(error);
        });
    }
}


// const getAllDemandes = (req,res,next) => {
//     db.sequelize.query("SELECT D.*, U.nom,U.prenom,C.photo FROM demandeaide AS D JOIN user AS U ON U.id_user = D.id_user JOIN compte AS C ON C.id_compte = D.id_user;", { type: QueryTypes.SELECT })
//         .then(result => {
//             res.status(200).send(result);
//         }).catch((error) => {
//              res.status(500).send(error);
//     });
// }

const getNumberOfUsersByRole = (req,res,next) => {
    db.sequelize.query("SELECT REPLACE(`role`,'ROLE_','') AS 'name',Count(`id_compte`) AS 'value' FROM `compte` GROUP BY `role`;", { type: QueryTypes.SELECT })
        .then(result => {
            res.status(200).send(result);
        }).catch((error) => {
             res.status(500).send(error);
    });
}

module.exports = {
    addDoctor,
    addBeneficier,
    addBenevole,
    addOrganization,
    editDoctor,
    editBeneficier,
    editBenevole,
    editOrganization,
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
    editAccountPhoto,
    getNumberOfUsersByRole
}