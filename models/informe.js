
const { Schema, model } = require('mongoose');
/**
 * Modelo de MongoDB de Informe
 * @type {*}
 */
const InformeSchema = Schema({
    doctorId: {
        type: String,
    },
    doctor:{
        type: String,
    },
    descripcion: {
        type: String
    },
    pruebasRealizadas:{
        type: String
    },
    usuario:{
        type: String
    },



});




module.exports = model('Informe', InformeSchema);
