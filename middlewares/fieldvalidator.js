const {validationResult} = require("express-validator");

/**
 * Funcion que valida todos los campos que se pasan cuando se accede a una ruta de la API REST
 * Esta funcion se la conoce como middleware
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const fieldvalidator = ( req, res, next ) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next();
}



module.exports = {
    fieldvalidator
}
