const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");
const { generateJWT } = require('../helpers/generateJWT');
const {Doctor} = require("../models");

/**
 * Esta función crea un token válido para el inicio de sesión de un usuario de la aplicación
 * @param req
 * @param res
 * @returns {Object}
 */
const login = async (req, res = response) => {

    //Se recoge todo el body que se mandarra a traves de axios desde ell cliente
    const { email, password, isDoctor} = req.body;
    try {

        //Verificar si existe el email comprobandolo en el modelo Usuario
        let usuario = await Usuario.findOne({ email: email});

        //Si dentro del body la variablle isDoctor = true significa que se debe buscar dentro del modelo Doctor
        if(isDoctor){
            usuario = await Doctor.findOne({ email: email});
        }

        //Verifica que las credencialees del usuario sean correctas
        if(!usuario) {
            return res.status(400).json({
                msg: 'El usuario / contraseña no son correctos'
            })
        }
        //Verificar si el usuario sigue activo, de lo contrario quiere decir que esa cuenta esta inactiva (borrada)
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario está deshabilitado'
            })
        }
        //Verificar la contraseña, el usuario existe pero la contraseña enviada no coincide con la de la base de datos
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if(!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            })
        }
        //Generar el JWT que se envia al cliente, este token es unico e indescifrable
        const token = await generateJWT(usuario.id);

        //Si todo va bien se envia la respuesta al cliente con los datos del usuario, y el token
        res.json({
            usuario,
            isDoctor,
            token
        })
    //Si algo sale mal quiere decir que fallo desde el servidor y se manda un error 500
    }catch (e) {
        console.log(e)
        return res.status(500).json({
            mgs: 'UPS! Algo salió mal'
        })
    }

}


//Se exporta la funcion
module.exports = {
    login
}
