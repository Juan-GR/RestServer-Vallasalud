const {validationResult} = require("express-validator");

//Los middlewares suelen tener 3 argumentos
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