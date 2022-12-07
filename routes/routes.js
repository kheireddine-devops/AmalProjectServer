const express = require('express');
const router = express.Router();
const Upload = require("./../config/multer");



const FormationController = require("../controllers/formations.controller");
const playlistsController = require("../controllers/playlists.controller");
const VideoController = require("../controllers/videos.controller");
const ProduitController = require("../controllers/Produits.controller");
const AvisController = require("../controllers/Avis.controller");
const UserController = require("../controllers/users.controller");
const AccountController = require("../controllers/accounts.controller");
const EmploiController = require("../controllers/emplois.controller");
const CandidatureController = require("../controllers/candidatures.controller");
const DemandeController = require("../controllers/demandeaide.controller");
const DemandeAideController = require("../controllers/commentaireaide.controller");
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
router.delete('/accounts/:id', AccountController.deleteAccountByID);
router.post('/accounts/exist-by-username', AccountController.existsAccountByUsername);
router.post('/accounts/exist-by-email', AccountController.existsAccountByEmail);
router.post('/accounts/exist-by-phone', AccountController.existsAccountByPhone);
router.post('/doctors/exist-by-cin', UserController.existsDoctorByCIN);
router.post('/doctors/exist-by-matricule', UserController.existsDoctorByMatricule);
router.post('/organizations/exist-by-matricule', UserController.existsOrganizationByMatricule);
router.post('/beneficiers/exist-by-catre', UserController.existsBeneficierByCarteHandicapNumber);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserByID);
router.post('/doctors', UserController.addDoctor);
router.put('/doctors/:id', UserController.editDoctor);
router.get('/doctors', UserController.getAllDoctors);
router.get('/doctors/:id', UserController.getDoctorByID);
router.get('/organizations', UserController.getAllOrganizations);
router.post('/organizations', UserController.addOrganization);
router.put('/organizations/:id', UserController.editOrganization);
router.get('/organizations/:id', UserController.getOrganizationByID);
router.get('/benevoles', UserController.getAllBenevoles);
router.post('/benevoles', UserController.addBenevole);
router.put('/benevoles/:id', UserController.editBenevole);
router.get('/benevoles/:id', UserController.getBenevoleByID);
router.get('/beneficiers', UserController.getAllBeneficiers);
router.post('/beneficiers', UserController.addBeneficier);
router.put('/beneficiers/:id', UserController.editBeneficier);
router.get('/beneficiers/:id', UserController.getBeneficierByID);

router.get('/test/users', UserController.getAllUsers);


router.put('/accounts/:id/photo/edit', Upload.UploadImageUsers.single('photo') , UserController.editAccountPhoto);

router.all('*', AuthMiddleware.IsAuth);

router.get('/auth/doctors', UserController.getAllDoctors);

module.exports = router;

/*
    req.file.filename
 */