const { Router } = require('express');

const {fieldvalidator} = require("../middlewares");
const {addCita,getCitas, obtainCitas} = require("../controllers/citas.controller");


const router = Router();

//RUTAS del endpoint /api/citas/ con validacion de campos

router.post('/nueva-cita', [
    fieldvalidator
],addCita);

router.get('/:usuarioId',[
    fieldvalidator
],getCitas);

router.get('/history/:doctor',[
    fieldvalidator
], obtainCitas );

module.exports = router;
