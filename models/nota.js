
const { Schema, model } = require('mongoose');

const NotaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String
    },
    usuarioId: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    activo: {
        type:Boolean,
        default: true
    }

});




module.exports = model('Nota', NotaSchema);