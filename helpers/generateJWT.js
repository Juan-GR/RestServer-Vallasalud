const jwt = require('jsonwebtoken');

/**
 * Función flecha que se encarga de generar un Json Web Token
 * @param uid uid
 * @returns {Promise<unknown>}
 */

const generateJWT = ( uid = '') => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
           expiresIn:'2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
}



module.exports = {
    generateJWT
}