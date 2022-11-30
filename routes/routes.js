const express = require('express');
const router = express.Router();

const FormationController = require("../controllers/formations.controller");
const UserController = require("../controllers/users.controller");
const AccountController = require("../controllers/accounts.controller");
const EmploiController = require("../controllers/emplois.controller");
const CandidatureController = require("../controllers/candidatures.controller");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

router.post('/auth', AccountController.login);

router.get('/formations', FormationController.getAllFormations);
router.post('/formations/add',FormationController.addFormation );
router.put('/formations/edit/:id', FormationController.editFormation);
router.delete('/formations/delete/:id', FormationController.deleteFormation);

//route sabrine
router.get('/emplois', EmploiController.getAllEmplois);
router.get('/emploi/get/:id', EmploiController.getEmploisById);
router.post('/emploi/add',EmploiController.addEmploi );
router.put('/emploi/edit/:id', EmploiController.editEmploi);
router.delete('/emploi/delete/:id', EmploiController.deleteEmploi);

router.get('/candidatures', CandidatureController.getAllCandidatures);
router.get('/candidature/get/:ide/:idc',CandidatureController.getCandidatureById );
router.post('/candidature/add',CandidatureController.addCandidature );
router.put('/candidature/edit/:ide/:idc', CandidatureController.editCandidature);
router.delete('/candidature/delete/:ide/:idc', CandidatureController.deleteCandidature);




router.all('*', AuthMiddleware.IsAuth);

router.get('/accounts', AccountController.getAllAccounts);
router.get('/users', UserController.getAllUsers);
router.get('/doctors', UserController.getAllDoctors);
router.get('/organizations', UserController.getAllOrganizations);
router.get('/benevoles', UserController.getAllBenevoles);
router.get('/beneficiers', UserController.getAllBeneficiers);

module.exports = router;
