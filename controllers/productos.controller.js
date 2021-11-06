const { Producto } = require('../models');


const obtenerProductos = async (req,res) => {

    let { limite = 5, desde = 0 } = req.query;
    const query = {estado:true};

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre') //El populate es utilizado para devolver las propiedades de un objeto, si no solo devolveria el id de mongo
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });


}

const obtenerProducto = async (req,res) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario','nombre')
        .populate('categoria','nombre');


    res.json({
        producto
    });


}

const crearProducto = async ( req, res ) => {

    const { estado,usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre:body.nombre.toUpperCase() });

    if(productoDB) {
        return res.status(400).json({
            'msg': `El producto ${productoDB.nombre} ya existe en la base de datos`
        })
    }

    //Generar solo los datos que queremos guardar
    const datos = {
        ...body,
        nombre:body.nombre.toUpperCase(),
        usuario:req.usuario._id,

    }

    const producto = new Producto(datos);
    await producto.save();

    res.status(200).json(producto);
}

const actualizarProducto = async (req,res) => {
    const { id } = req.params;
    const { estado, usuario, ...datos } = req.body;

    if(datos.nombre){
        datos.nombre = datos.nombre.toUpperCase();
    }

    datos.usuario = req.usuario._id;

    //Con la opcion new hacemos que devuelva el objeto ya actualizado
    const producto = await Producto.findByIdAndUpdate(id, datos, {new:true}).populate('usuario','nombre');

    res.json(producto);
}

const eliminarProducto = async (req,res) => {
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true});

    res.json(productoBorrado);
}




module.exports = {
    obtenerProductos,
    crearProducto,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}