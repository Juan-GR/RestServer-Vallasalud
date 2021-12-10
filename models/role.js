
const { Schema, model } = require('mongoose');
/**
 * Modelo de MongoDB de Rol
 * @type {*}
 */
const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }

});




module.exports = model('Role', RoleSchema);
