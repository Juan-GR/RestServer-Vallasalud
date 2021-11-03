const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");
const { generateJWT } = require('../helpers/generateJWT');

/**
 * Esta función crea un token válido para el inicio de sesión de un usuario de la aplicación
 * @param req
 * @param res
 * @returns {Promise<Response<any, Record<string, any>, number>>}
 */
const login = async (req, res = response) => {

    const { email, password} = req.body;

    try {
        //Verificar si existe el email
        const usuario = await Usuario.findOne({ email: email});

        if(!usuario) {
            return res.status(400).json({
                msg: 'El usuario / contraseña no son correctos'
            })
        }
        //Verificar si el usuario sigue activo
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario está deshabilitado'
            })
        }
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if(!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            })
        }
        //Generar el JWT
        const token = await generateJWT(usuario.id);


        res.json({
            usuario,
            token
        })

    }catch (e) {
        console.log(e)
        return res.status(500).json({
            mgs: 'UPS! Algo salió mal'
        })
    }

}

module.exports = {
    login
}