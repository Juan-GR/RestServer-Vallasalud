const fieldvalidator = require('../middlewares/fieldvalidator');
const jwtValidator = require('../middlewares/JWTValidator');
const validateRoles = require('../middlewares/rolValidator');
const fileValidator = require('../middlewares/fileValidator');


module.exports = {
    ...fieldvalidator,
    ...jwtValidator,
    ...validateRoles,
    ...fileValidator
}