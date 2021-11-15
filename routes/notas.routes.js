const { Router } = require('express');
const {addNote, obtainNota, obtainNotas, deleteNota, updateNota} = require("../controllers/notas.controller");
const {fieldvalidator, jwtValidator, isAdminRole} = require("../middlewares");


const router = Router();

router.post('/nueva-nota', [
    jwtValidator,
    isAdminRole,
    fieldvalidator
],addNote);

router.get('/:id', [
    jwtValidator,
    fieldvalidator
],obtainNota);

router.get('/',[
    jwtValidator,
    fieldvalidator
],obtainNotas);

router.delete('/:id',deleteNota);

router.put('/:id',updateNota);

module.exports = router;
