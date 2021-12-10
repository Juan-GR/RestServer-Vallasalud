const {v4: uuidv4} = require("uuid");
const path = require("path");

/**
 * Funcion que sube un archivo al servidor en la ruta /archivos
 * @param files
 * @param extensionesValidas Array de las extensiones de archivos que se pueden subir al servidor
 * @param carpeta La ruta de la carpeta
 * @returns {Promise<unknown>}
 */
const subirArchivo = (files, extensionesValidas = ['jpeg','png','txt','pdf','jpg'],carpeta = '') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombrePorPartes = archivo.name.split('.');
        const extension = nombrePorPartes[nombrePorPartes.length - 1];


        //Validar la extension
        if (!extensionesValidas.includes(extension)){
            return reject(`La extension ${extension} no está permitida. Extensiones permitidas: ${extensionesValidas}`);
        }

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../archivos/', carpeta, nombreTemp);


        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(nombreTemp);
        });
    })
}



module.exports = {
    subirArchivo
}
