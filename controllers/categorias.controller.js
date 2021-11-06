const { Categoria } = require('../models');


const obtenerCategorias = async (req,res) => {

    let { limite = 5, desde = 0 } = req.query;
    const query = {estado:true};

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre') //El populate es utilizado para devolver las propiedades de un objeto, si no solo devolveria el id de mongo
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
    });


}

const obtenerCategoria = async (req,res) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre');


    res.json({
        categoria
    });


}

const crearCategoria = async ( req, res ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if(categoriaDB) {
        return res.status(400).json({
            'msg': `La categoria ${categoriaDB.nombre} ya existe en la base de datos`
        })
    }

    //Generar solo los datos que queremos guardar
    const datos = {
        nombre,
        usuario:req.usuario._id
    }

    const categoria = new Categoria(datos);
    await categoria.save();

    res.status(200).json(categoria);
}

const actualizarCategoria = async (req,res) => {
    const { id } = req.params;
    const { estado, usuario, ...datos } = req.body;

    datos.nombre = datos.nombre.toUpperCase();
    datos.usuario = req.usuario._id;

    //Con la opcion new hacemos que devuelva el objeto ya actualizado
    const categoria = await Categoria.findByIdAndUpdate(id, datos, {new:true}).populate('usuario','nombre');

    res.json(categoria);
}

const eliminarCategoria = async (req,res) => {
    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true});

    res.json(categoriaBorrada);
}




module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}