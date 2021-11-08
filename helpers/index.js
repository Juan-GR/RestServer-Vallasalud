

const dbValidators = require('./db-validators');
const generateJWT = require('./generateJWT');
const uploadFiles = require('./upload-files');


module.exports= {
    ...dbValidators,
    ...generateJWT,
    ...uploadFiles
}