const { Router } = require('express');
const {check} = require("express-validator");
const {login} = require("../controllers/auth.controller");
const {fieldvalidator} = require("../middlewares/fieldvalidator");

const router = Router();

//En el segundo argumento se mandan los middlewares
router.post('/login',  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    fieldvalidator
],login);



module.exports = router;