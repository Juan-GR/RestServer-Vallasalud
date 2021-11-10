const { Router } = require('express');
const {addNote, obtainNota, obtainNotas, deleteNota, updateNota} = require("../controllers/notas.controller");
const {fieldvalidator} = require("../middlewares");


const router = Router();

router.post('/nueva-nota', addNote);

router.get('/:id', [
    fieldvalidator
],obtainNota);

router.get('/',obtainNotas);

router.delete('/:id',deleteNota);

router.put('/:id',updateNota);

module.exports = router;