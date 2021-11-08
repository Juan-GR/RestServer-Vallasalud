const {v4: uuidv4} = require("uuid");
const path = require("path");


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