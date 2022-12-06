const express = require('express');
const router = express.Router();

const FormationController = require("../controllers/formations.controller");
const UserController = require("../controllers/users.controller");
const AccountController = require("../controllers/accounts.controller");
const EmploiController = require("../controllers/emplois.controller");
const CandidatureController = require("../controllers/candidatures.controller");
const DemandeController = require("../controllers/demandeaide.controller");
const DemandeAideController = require("../controllers/commentaireaide.controller");
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

//Routes Ameni
router.get('/demandeaides',DemandeController.getDemande );
router.get('/demande/get/:id',DemandeController.getDemandeById );
router.get('/demande/search/:type',DemandeController.searchDemande );
router.post('/demande/add',DemandeController.addDemande );
router.put('/demande/edit/:id',DemandeController.updateDemande );
router.delete('/demande/delete/:id', DemandeController.deleteDemande);

router.get('/commentaireaides',DemandeAideController.getCommentaireaide );
router.post('/commentaire/add',DemandeAideController.addCommentaireaide );
router.get('/commentaire/get/:id',DemandeAideController.getCommentaireById );
router.get('/commentaireaides/:iddemande', DemandeAideController.getCommentaireDemande );
router.put('/commentaire/edit/:id', DemandeAideController.updateCommentaireaide );
router.delete('/commentaire/delete/:id', DemandeAideController.deleteCommentaireaide);

// Routes Users
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
