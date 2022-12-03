const express = require('express');
const router = express.Router();

const FormationController = require("../controllers/formations.controller");
const ProduitController = require("../controllers/Produits.controller");
const AvisController = require("../controllers/Avis.controller");
const UserController = require("../controllers/users.controller");
const AccountController = require("../controllers/accounts.controller");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

router.post('/auth', AccountController.login);

router.get('/formations', FormationController.getAllFormations);
router.post('/formations/add',FormationController.addFormation );
router.put('/formations/edit/:id', FormationController.editFormation);
router.delete('/formations/delete/:id', FormationController.deleteFormation);

/******************************Produit ***********************************/

router.get('/produits', ProduitController.getAllProduits);
router.get('/produit/:id',ProduitController.getOneProduit);
router.post('/createproduit',ProduitController.addProduit );
router.put('/produit/update/:id', ProduitController.editProduit);
router.delete('/produit/delete/:id', ProduitController.deleteProduit);


/******************************Avis***********************************/

router.get('/avis', AvisController.getAllAvis);
router.post('/createavis',AvisController.addAvis );
router.put('/avis/update/:id', AvisController.editAvis);
router.delete('/avis/delete/:id', AvisController.deleteAvis);

router.all('*', AuthMiddleware.IsAuth);

router.get('/accounts', AccountController.getAllAccounts);
router.get('/users', UserController.getAllUsers);
router.get('/doctors', UserController.getAllDoctors);
router.get('/organizations', UserController.getAllOrganizations);
router.get('/benevoles', UserController.getAllBenevoles);
router.get('/beneficiers', UserController.getAllBeneficiers);

module.exports = router;
