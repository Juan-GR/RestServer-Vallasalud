const mongoose = require('mongoose');

/**
 * Función flecha que se encarga de conectarse a la base de datos MONGODB
 * En caso de no poder conectarse lanza un error
 * @returns {}
 * @throw new Error
 */
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Conectado satisfactoriamente a la base de datos MONGODB');
    } catch (error) {
        throw new Error('No pudo establecerse la conexión a la base de datos', error);
    }
}


module.exports = {
    dbConnection
}
