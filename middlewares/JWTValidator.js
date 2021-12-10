const jwt = require('jsonwebtoken');
const {response, request} = require("express");
const Usuario = require('../models/usuario');
const {Doctor} = require("../models");


/**
 * Funcion que valida que el token que se recoge a traves de las cabeceras de una peticion sea valido
 * Comprueba si existe el usuario, si no esta eliminado y si el token que tiene es valido y no ha sido modificado o eliminado
 * @param req
 * @param res
 * @param next
 * @returns {Object}
 */
const jwtValidator = async (req = request, res = response, next) => {

    const token = req.header('userToken');
    if(!token){
        return res.status(401).json({
            msg: 'Usuario no logeado'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY );

        let usuario = await Usuario.findById(uid);

        if(!usuario){
            usuario = await Doctor.findById(uid);
        }

        if(!usuario){
            return res.status(401).json({
                msg: 'Usuario no existente'
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario deshabilitado'
            })
        }

        req.usuario = usuario;
        next();
    }catch (e) {
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }
}


module.exports = {
    jwtValidator
}
