const { Router } = require('express');
const { check } = require("express-validator");

const { fieldvalidator } = require("../middlewares/fieldvalidator");
const {isMACAddress} = require("validator");

const router = Router();


//Obtener todas las categorias -> publico
router.get('/', (req,res) => {
    res.json('get')
});

//Obtener una categoria por id -> publico
router.get('/:id', (req,res) => {
    res.json('get id')
});

//Crear categoria -> siempre que tenga token
router.post('/:id', (req,res) => {
    res.json('post')
});

//Actualizar registro -> siempre que tenga token
router.put('/:id', (req,res) => {
    res.json('put')
});

//Borrar categoria -> ADMIN
router.delete('/:id', (req,res) => {
    res.json('delete')
});

module.exports = router;