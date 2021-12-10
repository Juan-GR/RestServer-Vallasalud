const { Router } = require('express');
const {check} = require("express-validator");

const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
const {getUsuarios, putUsuarios, postUsuarios, deleteUsuarios, getInfoUser, getUsersByDoctor} = require('../controllers/usuario.controller');


//Importación mas limpia
const { fieldvalidator , jwtValidator , verifyRol } = require('../middlewares/index');

const router = Router();

//RUTAS del endpoint /api/user/ con validacion de campos

//En el segundo argumento se mandan los middlewares
//En cada ruta se ejecutan unos middlewares u otros, como verificacion de rol de usuario, validacion de campos etc...
router.get('/', getUsuarios );

router.get('/:userId', getInfoUser);

router.get('/users/:name',getUsersByDoctor);

router.put('/:userId', [
    check('userId', 'No es un id válido').isMongoId(),
    check('userId').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    fieldvalidator
] ,putUsuarios );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(existeEmail),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener mas de 6 letras').isLength({min: 6}),
    fieldvalidator
], postUsuarios );

router.delete('/:userId', [
    jwtValidator,
    verifyRol('ADMIN_ROLE', 'DOCTOR_ROLE'),
    check('userId', 'No es un id válido').isMongoId(),
    check('userId').custom(existeUsuarioPorId),
    fieldvalidator
] ,deleteUsuarios );


module.exports = router;
