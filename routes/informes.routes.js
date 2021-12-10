const { Router } = require('express');

const {fieldvalidator} = require("../middlewares");
const {addInforme, getInformes} = require("../controllers/informes.controller");


const router = Router();

//RUTAS del endpoint /api/informes/ con validacion de campos

router.post('/nuevo-informe', [
    fieldvalidator
],addInforme);

router.get('/:usuario',[
    fieldvalidator
], getInformes)


module.exports = router;
