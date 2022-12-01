const express = require('express');
const router = express.Router();

const FormationController = require("../controllers/formations.controller");
const UserController = require("../controllers/users.controller");
const AccountController = require("../controllers/accounts.controller");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

router.post('/auth', AccountController.login);

router.get('/formations', FormationController.getAllFormations);
router.post('/formations/add',FormationController.addFormation );
router.put('/formations/edit/:id', FormationController.editFormation);
router.delete('/formations/delete/:id', FormationController.deleteFormation);


router.get('/accounts', AccountController.getAllAccounts);
router.get('/accounts/:id', AccountController.getAccountByID);
router.post('/accounts/exist-by-username', AccountController.existsAccountByUsername);
router.post('/accounts/exist-by-email', AccountController.existsAccountByEmail);
router.post('/accounts/exist-by-phone', AccountController.existsAccountByPhone);
router.post('/doctors/exist-by-cin', UserController.existsDoctorByCIN);
router.post('/doctors/exist-by-matricule', UserController.existsDoctorByMatricule);
router.post('/organizations/exist-by-matricule', UserController.existsOrganizationByMatricule);
router.post('/beneficiers/exist-by-catre', UserController.existsBeneficierByCarteHandicapNumber);
router.get('/users', UserController.getAllUsers);
router.post('/doctors', UserController.addDoctor);
router.get('/doctors', UserController.getAllDoctors);
router.get('/organizations', UserController.getAllOrganizations);
router.get('/benevoles', UserController.getAllBenevoles);
router.get('/beneficiers', UserController.getAllBeneficiers);



router.all('*', AuthMiddleware.IsAuth);



module.exports = router;
