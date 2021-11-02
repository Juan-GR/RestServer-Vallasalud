const { Router } = require('express');
const {check} = require("express-validator");

const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
const { fieldvalidator } = require('../middlewares/fieldvalidator');

const {getUsuarios, putUsuarios, postUsuarios, deleteUsuarios, patchUsuarios} = require('../controllers/usuario.controller');


const router = Router();

//En el segundo argumento se mandan los middlewares
router.get('/', getUsuarios );

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
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE']),
    check('rol').custom(esRolValido),
    fieldvalidator
], postUsuarios );

router.delete('/:userId', [
    check('userId', 'No es un id válido').isMongoId(),
    check('userId').custom(existeUsuarioPorId),
    fieldvalidator
] ,deleteUsuarios );

router.patch('/', patchUsuarios );


module.exports = router;