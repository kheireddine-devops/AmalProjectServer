const express = require('express');
const router = express.Router();

const FormationController = require("../controllers/formations.controller");
const UserController = require("../controllers/users.controller");
const AccountController = require("../controllers/accounts.controller");


router.get('/formations', FormationController.getAllFormations);
router.post('/formations/add',FormationController.addFormation );
router.put('/formations/edit/:id', FormationController.editFormation);
router.delete('/formations/delete/:id', FormationController.deleteFormation);

router.get('/accounts', AccountController.getAllAccounts);
router.get('/users', UserController.getAllUsers);
router.get('/doctors', UserController.getAllDoctors);
router.get('/organizations', UserController.getAllOrganizations);
router.get('/benevoles', UserController.getAllBenevoles);
router.get('/beneficiers', UserController.getAllBeneficiers);

module.exports = router;
