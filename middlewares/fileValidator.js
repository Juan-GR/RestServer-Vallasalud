/**
 * Funcion que valida que un archivo se ha subido correctamente y con la extension correcta
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

const fileValidator = (req,res,next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo){
        return res.status(400).json({
            msg:'No se han cargado archivos'
        });
    }
    next();
}



module.exports = {
    fileValidator
}
