const { response } = require('express');


const getUsuarios = (req, res = response) => {

    const params = req.query;


    res.json({
        msg: 'GET API - CONTROLADOR',
        params
    });
}

const postUsuarios = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'POST API - CONTROLADOR',
        nombre,
        edad

    });
}

const putUsuarios = (req, res = response) => {

    const id = req.params.userId;

    res.status(201).json({
        msg: 'PUT API - CONTROLADOR',
        id
    });
}

const deleteUsuarios = (req, res = response) => {
    res.json({
        msg: 'DELETE API - CONTROLADOR'
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