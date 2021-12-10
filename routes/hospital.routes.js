const { Router } = require('express');

const {fieldvalidator} = require("../middlewares");
const {obtainDoctorsByHospital, postDoctor, obtainPatientsByDoctor} = require("../controllers/hospital.controller");


const router = Router();

//RUTAS del endpoint /api/hospital/ con validacion de campos

router.get('/:hospital/doctors',[
    fieldvalidator
], obtainDoctorsByHospital );

router.get('/:doctor',[
    fieldvalidator
], obtainPatientsByDoctor );


router.post('/',[
    fieldvalidator
], postDoctor);


module.exports = router;
