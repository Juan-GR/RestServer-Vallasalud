
const { Schema, model } = require('mongoose');
/**
 * Modelo de MongoDB de Usuario
 * @type {*}
 */
const UsuarioSchema = Schema({
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
    medico: {
        type: String,
        required: [true, 'Debes seleccionar el médico que te pertenece']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es obligatoria']
    },
    img: {
        type: String,
        default: 'no_photo'
    },
    rol: {
        type: String,
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    }
});


UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);
