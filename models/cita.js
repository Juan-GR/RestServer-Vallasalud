
const { Schema, model } = require('mongoose');
/**
 * Modelo de MongoDB de Cita
 * @type {*}
 */

const CitaSchema = Schema({
    usuarioId: {
        type: String,
    },
    usuario:{
        type: String,
    },
    descripcion: {
        type: String
    },
    hora: {
        type: String,
    },
    fecha: {
        type:String,
    },
    doctor:{
        type: String,
    },
    hospital: {
        type: String,
    },
    aceptada:{
        type: Boolean,
        default: false
    }

});


module.exports = model('Cita', CitaSchema);
