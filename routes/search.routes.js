const { Router } = require('express');
const { search } = require('../controllers/search.controller');

const router = Router();



router.get('/:coleccion/:termino',search);









module.exports = router;