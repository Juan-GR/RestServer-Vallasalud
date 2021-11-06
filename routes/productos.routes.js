const { Router } = require('express');
const { check } = require("express-validator");

const { fieldvalidator, jwtValidator, isAdminRole} = require("../middlewares");
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, eliminarProducto } = require("../controllers/productos.controller");
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();


//Obtener todas las categorias -> publico
router.get('/',obtenerProductos);

// //Obtener una categoria por id -> publico
router.get('/:id',[
    check('id', 'No es un id válido de MONGO').isMongoId(),
    check('id').custom(existeProductoPorId),
    fieldvalidator
],obtenerProducto );

// //Crear producto -> siempre que tenga token
router.post('/', [
    jwtValidator,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    fieldvalidator
] , crearProducto);

// //Actualizar categoria -> siempre que tenga token
router.put('/:id', [
    jwtValidator,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //check('categoria', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    fieldvalidator
],actualizarProducto);

// //Borrar categoria -> ADMIN
router.delete('/:id', [
    jwtValidator,
    isAdminRole,
    check('id', 'No es un id válido de MONGO').isMongoId(),
    check('id').custom(existeProductoPorId),
    fieldvalidator
],eliminarProducto);

module.exports = router;