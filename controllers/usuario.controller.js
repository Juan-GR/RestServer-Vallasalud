const { response } = require('express');
const Usuario  = require('../models/usuario');
const {encriptarPassword} = require("../helpers/db-validators");

const getUsuarios = async (req, res = response) => {

    let { limite = 5, desde = 0 } = req.query;
    const query = {estado:true};
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));
    //
    // const total = await Usuario.countDocuments(query);

    //Permite mandar un array con todas las promesas que quiero ejecutar y se ejecutan a la vez por lo que el resultado es más rapido
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

//Agregar un usuario
const postUsuarios =async (req, res = response) => {

    const { nombre,email,password,rol } = req.body;
    const usuario = new Usuario({nombre,email,password,rol});

    encriptarPassword(usuario,password);

    //Guardar el objeto en la base de datos
    await usuario.save();

    res.json({
        usuario
    });
}

//Modificar un usuario
const putUsuarios = async (req, res = response) => {

    const {userId} = req.params;

    const { _id, password, google, email, ...usuario } = req.body;
    if(password){
        encriptarPassword(usuario,password);
    }

    const usuarioDB = await Usuario.findByIdAndUpdate(userId, usuario);

    res.status(201).json({
        usuarioDB
    });
}

const deleteUsuarios = async (req, res = response) => {

    const {userId} = req.params;

    //Borrar usuario fisicamente
    //const usuario = await Usuario.findByIdAndDelete(userId);

    const usuario = await Usuario.findByIdAndUpdate(userId, {estado:false});

    res.json({
        usuario
    });
}

const patchUsuarios = (req, res = response) => {
    res.json({
        msg: 'PATCH API - CONTROLADOR'
    });
}



module.exports = {
    getUsuarios,
    putUsuarios,
    postUsuarios,
    deleteUsuarios,
    patchUsuarios
}