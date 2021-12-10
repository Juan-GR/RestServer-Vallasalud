const { Router } = require('express');
const {check} = require("express-validator");
const {login} = require("../controllers/auth.controller");
const {fieldvalidator} = require("../middlewares/fieldvalidator");

const router = Router();

//Ruta /api/auth/login, en esta ruta se comprueba el mail y la contraseña y cuando pasa los middlewares ejecuta la funcion login
router.post('/login',  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    fieldvalidator
],login);



module.exports = router;
