const Role = require("../models/role");
const {Usuario} = require("../models");
const bcryptjs = require("bcryptjs");

/**
 * Funcion que valida que el rol que se introduce al crear un usuario es válido
 * @param rol
 * @returns {Error}
 */
const esRolValido = async (rol = '') => {
    const rolExist = await Role.findOne({rol});
    if(!rolExist){
        throw new Error(`El rol ${ rol } no es un rol permitido`);
    }
}

/**
 * Funcion que valida si existe un usuario por id cuando se vaya a realizar alguna consulta con ese id
 * @param userId
 * @returns {Error}
 */
const existeUsuarioPorId = async (userId) => {
    //Verificar si el id del usuario existe
    const existeUsuario = await Usuario.findById(userId);
    if (!existeUsuario){
        throw new Error(`El id ${ userId } no existe`);
    }
}

/**
 * Funcion que valida si el email de un usuario existe
 * @param email
 * @returns {Error}
 */
const existeEmail = async (email = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({email});

    if (existeEmail){
        throw new Error(`El email ${ email } ya existe`);
    }
}

/**
 * Funcion que encripta una contraseña que se le pasa como parametro
 * @param usuario Usuario que tiene la contraseña que va a ser encriptada
 * @param password La contraseña que va a ser encriptada
 */
const encriptarPassword = (usuario,password) => {
    //Encripar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
}



module.exports = {
    esRolValido,
    existeEmail,
    encriptarPassword,
    existeUsuarioPorId,
}
