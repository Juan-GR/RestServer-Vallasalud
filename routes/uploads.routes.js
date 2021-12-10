const { Router } = require('express');
const {check} = require("express-validator");


const {fieldvalidator, fileValidator} = require("../middlewares");
const {uploadFile, showImage, updateImageCloudinary} = require("../controllers/uploads.controller");
const {coleccionesPermitidas} = require("../helpers");

const router = Router();



router.post('/', [
    fileValidator
],uploadFile);

router.get('/:coleccion/:id',[
    check('id', 'El id debe ser de MONGO').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    fieldvalidator
], showImage);

router.put('/:coleccion/:id',[
    fileValidator,
    check('id', 'El id debe ser de MONGO').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    fieldvalidator
],updateImageCloudinary);



module.exports = router;
