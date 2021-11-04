const jwt = require('jsonwebtoken');
const {response, request} = require("express");
const Usuario = require('../models/usuario');

const jwtValidator = async (req = request, res = response, next) => {

    const token = req.header('userToken');
    if(!token){
        return res.status(401).json({
            msg: 'Usuario no logeado'
        })
    }
    
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY );

        const usuario = await Usuario.findById(uid);

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