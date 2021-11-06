const {Usuario,Categoria,Producto} = require("../models");
const { ObjectId } = require('mongoose').Types;

const coleccionesPermitidas = [
    'usuarios','categorias', 'productos', 'roles'
]

const searchUsuarios = async(termino = '', res) => {

    const esMongoId = ObjectId.isValid(termino) //Si es id de mongo devuelve true
    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }
    const regex = new RegExp( termino, 'i' )

    const usuarios = await Usuario.find({
        $or: [
            {nombre:regex},
            {email:regex}
        ],
        $and: [
            {estado:true}
        ]
    });
    res.json({
        results: usuarios
    })

}

const searchCategorias = async(termino = '', res) => {

    const esMongoId = ObjectId.isValid(termino) //Si es id de mongo devuelve true
    if(esMongoId){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }
    const regex = new RegExp( termino, 'i' )

    const categorias = await Categoria.find({
        nombre:regex,
        estado:true
    });
    res.json({
        results: categorias
    })

}

const searchProductos = async(termino = '', res) => {

    //Para buscar todos los productos de una determinada categoria habria que filtrar con un filter {categoria: ObjectId(id de la categoria)}

    const esMongoId = ObjectId.isValid(termino) //Si es id de mongo devuelve true
    if(esMongoId){
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            results: (producto) ? [producto] : []
        })
    }
    const regex = new RegExp( termino, 'i' )

    const producto = await Producto.find({
        nombre:regex,
        estado:true
    }).populate('categoria','nombre');
    res.json({
        results: producto
    })

}

const search = (req,res) => {

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            searchUsuarios(termino,res);
            break;
        case 'categorias':
            searchCategorias(termino,res);
            break;
        case 'productos':
            searchProductos(termino,res);
            break;
        case 'roles':
            break;
        default:
            res.status(500).json({
                msg: 'Coleccion no controlada'
            })

    }

}



module.exports = {
    search
}