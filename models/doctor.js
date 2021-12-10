
const { Schema, model } = require('mongoose');
/**
 * Modelo de MongoDB de Doctor
 * @type {*}
 */
const DoctorSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    hospital: {
        type: String,
        required: [true, 'Debes seleccionar el hospital que te pertenece'],
        enum: ['Hospital Clinico', 'Rio Hortega', 'Hospital Rondilla']
    },
    especialidad: {
        type: String,
        default: 'Medico de cabecera'
    },
    img: {
        type: String,
        default: 'no_photo'
    },
    rol: {
        type: String,
        required: true,
        default: 'DOCTOR_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    }
});



module.exports = model('Doctor', DoctorSchema);
