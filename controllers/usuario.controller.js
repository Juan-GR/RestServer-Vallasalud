const { response } = require('express');
const Usuario  = require('../models/usuario');
const {encriptarPassword} = require("../helpers/db-validators");
const {Doctor} = require("../models");


/**
 *
 * Esta funccion devuelve todos los usuarios de la base de datos
 * Tambien puedes pasar parametros en la url como un limite de usuarios devueltos o desde que numero de usuario
 * @param req
 * @param res
 * @returns {Object}
 */
const getUsuarios = async (req, res = response) => {

    //Se guarda el limite y desde que usuario
    let { limite = 5, desde = 0 } = req.query;
    const query = {estado:true};

    //Permite mandar un array con todas las promesas que quiero ejecutar y se ejecutan a la vez por lo que el resultado es más rapido
    //Aqui sse buscan desde un numero que se especifique y un numero de usuarios
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    //Se vuelve en formato json el total de usuarios y la lista de usuarios
    res.json({
        total,
        usuarios
    });
}

/**
 * Funcion que devuelve toda la informacion de un usuario ya sea paciente o medico
 * @param req
 * @param res
 * @returns {Object}
 */
const getInfoUser = async (req, res = response) => {

    //Segun se mande en el parametro si es un medico o no se buscara en un modelo u otro
    const {userId} = req.params;
    const {isDoctor = 'no'} = req.query;
    let usuario;
    if(isDoctor === 'yes'){
        usuario = await Doctor.findById(userId);
    }else{
        usuario = await Usuario.findById(userId);
    }
    //Devuelve el usuario en formato json
    res.json({
        usuario
    });
}

/**
 * Funcion que devuelve todos los pacientes que están a cargo de un medico
 * @param req
 * @param res
 * @returns {Object}
 */
const getUsersByDoctor = async (req, res = response) => {

    const {name} = req.params;

    const usuarios = await Usuario.find({medico:name});


    res.json({
        usuarios
    });
}


/**
 * Funcion que agrega un nuevo paciente a la base de datos
 * @param req
 * @param res
 * @returns {Object}
 */
const postUsuarios =async (req, res = response) => {
    //Recoge todos los datos que se envian en el body y se crea un nuevo usuario
    const { nombre,email,password,medico,hospital,direccion } = req.body;
    const usuario = new Usuario({nombre,email,password,medico,hospital,direccion});

    //Se encripta la contraseña en la base de datos
    encriptarPassword(usuario,password);

    //Guardar el objeto en la base de datos
    await usuario.save();

    res.json({
        usuario
    });
}

/**
 * Permite modificar los datos de un usuario que se envian a traves de la peticion
 * @param req
 * @param res
 * @returns {Object}
 */
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

/**
 * Funcion que borra un usuario que se pasa como parametro
 * @param req
 * @param res
 * @returns {Object}
 */
const deleteUsuarios = async (req, res = response) => {
    //Se guarda el id del usuario que se manda como parametro y se quiere borrar
    const {userId} = req.params;

    //Borrar usuario fisicamente
    //const usuario = await Usuario.findByIdAndDelete(userId);

    //Se busca el usuario en el modelo y se establece su estado a false que es como si estuviera borrado aunque no se borre fisicamente
    const usuario = await Usuario.findByIdAndUpdate(userId, {estado:false});
    const usuarioAutenticado = req.usuario;
    res.json({
        usuario,
        usuarioAutenticado
    });
}

//Se exportan las funciones
module.exports = {
    getUsuarios,
    putUsuarios,
    postUsuarios,
    deleteUsuarios,
    getInfoUser,
    getUsersByDoctor
}
