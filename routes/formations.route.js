var express = require('express');
var router = express.Router();

const FormationController = require("../controllers/formations.controller");


router.get('/', FormationController.getAllFormations);
router.post('/add',FormationController.addFormation );
router.put('/edit/:id', FormationController.editFormation);
router.delete('/delete/:id', FormationController.deleteFormation);

module.exports = router;
