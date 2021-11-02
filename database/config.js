const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Base de datos conectada');
    } catch (error) {
        throw new Error('No pudo establecerse la conexión a la base de datos', error);
    }
}


module.exports = {
    dbConnection
}