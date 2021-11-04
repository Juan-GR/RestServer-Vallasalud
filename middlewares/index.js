const fieldvalidator = require('../middlewares/fieldvalidator');
const jwtValidator = require('../middlewares/JWTValidator');
const validateRoles = require('../middlewares/rolValidator');



module.exports = {
    ...fieldvalidator,
    ...jwtValidator,
    ...validateRoles
}