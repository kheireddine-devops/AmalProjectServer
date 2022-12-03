const express = require('express');
const router = express.Router();



const FormationController = require("../controllers/formations.controller");
const playlistsController = require("../controllers/playlists.controller");
const VideoController = require("../controllers/videos.controller");
const UserController = require("../controllers/users.controller");
const AccountController = require("../controllers/accounts.controller");
const EmploiController = require("../controllers/emplois.controller");
const CandidatureController = require("../controllers/candidatures.controller");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

router.post('/auth', AccountController.login);

//route  annoce formations (asma)
router.get('/formations/', FormationController.getAllFormations);
router.get('/formations/get/:id', FormationController.getFormationById);
router.post('/formations/add/',FormationController.addFormation );
router.put('/formations/edit/:id', FormationController.editFormation);
router.delete('/formations/delete/:id', FormationController.deleteFormation);

//route des  playliste  (asma)

router.get('/playlists/', playlistsController.getAllPlaylists);//include id-compte
router.get('/playlist/get/:id', playlistsController.getPlaylist);//include compte
router.post('/playlists/add/',playlistsController.addPlaylist );//include compte
router.put('/playlists/edit/:id', playlistsController.editPlaylist);//include compte
router.delete('/playlists/delete/:id', playlistsController.deletePlaylist);//cascade dans le model


//route des video d'une playliste  (asma)


router.post('/playlists/video/add',VideoController.uploadVideo );//include playliste
router.delete('/playlists/video/delete/:id', VideoController.deleteVideo);//cascade



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


// router.all('*', AuthMiddleware.IsAuth);



module.exports = router;
