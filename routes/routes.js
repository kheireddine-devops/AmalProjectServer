var express = require('express');
var router = express.Router();

const FormationController = require("../controllers/formations.controller");


router.get('/formations', FormationController.getAllFormations);
router.post('/formations/add',FormationController.addFormation );
router.put('/formations/edit/:id', FormationController.editFormation);
router.delete('/formations/delete/:id', FormationController.deleteFormation);

module.exports = router;
