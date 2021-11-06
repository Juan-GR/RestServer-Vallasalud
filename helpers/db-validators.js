const Role = require("../models/role");
const {Usuario,Categoria, Producto} = require("../models");
const bcryptjs = require("bcryptjs");


const esRolValido = async (rol = '') => {
    const rolExist = await Role.findOne({rol});
    if(!rolExist){
        throw new Error(`El rol ${ rol } no es un rol permitido`);
    }
}

const existeUsuarioPorId = async (userId) => {
    //Verificar si el id del usuario existe
    const existeUsuario = await Usuario.findById(userId);
    if (!existeUsuario){
        throw new Error(`El id ${ userId } no existe`);
    }
}

const existeEmail = async (email = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({email});

    if (existeEmail){
        throw new Error(`El email ${ email } ya existe`);
    }
}

const encriptarPassword = (usuario,password) => {
    //Encripar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
}

const existeCategoriaPorId = async (id) => {

    const existeCategoria = await Categoria.findById(id);

    if (!existeCategoria){
        throw new Error(`El id ${ id } no existe como categoría`);
    }

}

const existeProductoPorId = async (id) => {

    const existeProducto = await Producto.findById(id);

    if (!existeProducto){
        throw new Error(`El id ${ id } no existe como producto`);
    }

}


module.exports = {
    esRolValido,
    existeEmail,
    encriptarPassword,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}