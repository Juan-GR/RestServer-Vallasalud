const { Router } = require('express');
const { check } = require("express-validator");

const { fieldvalidator, jwtValidator, isAdminRole} = require("../middlewares");
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require("../controllers/categorias.controller");
const {existeCategoriaPorId} = require('../helpers/db-validators');
const router = Router();


//Obtener todas las categorias -> publico
router.get('/',obtenerCategorias);

//Obtener una categoria por id -> publico
router.get('/:id',[
    check('id', 'No es un id válido de MONGO').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    fieldvalidator
],obtenerCategoria );

//Crear categoria -> siempre que tenga token
router.post('/', [
    jwtValidator,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    fieldvalidator
] , crearCategoria);

//Actualizar categoria -> siempre que tenga token
router.put('/:id', [
    jwtValidator,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    fieldvalidator
],actualizarCategoria);

//Borrar categoria -> ADMIN
router.delete('/:id', [
    jwtValidator,
    isAdminRole,
    check('id', 'No es un id válido de MONGO').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    fieldvalidator
],eliminarCategoria);

module.exports = router;