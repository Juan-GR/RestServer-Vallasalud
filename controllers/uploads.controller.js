const path = require('path');
const {subirArchivo} = require('../helpers');
const {Usuario, Producto} = require("../models");
const fs = require("fs");

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);




const uploadFile = async (req , res ) => {

    try {
        const nombre = await subirArchivo(req.files, undefined, 'pngs');
        res.json({
            nombre
        })
    }catch (e) {
        res.status(400).json(
            {msg:'Extension no permitida'}
        )
    }

}

const updateImage = async (req,res) => {

    const {id,coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg:'No existe un usuario con ese id'
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg:'No existe un producto con ese id'
                })
            }
            break;
        default:
            return res.status(500).json({
                msg:'Esa coleccion no está contemplada'
            })
    }

    //Limpiar imagenes previas
    if(modelo.img){
        //Borrar la imagen del servidor
        const pathImage = path.join(__dirname, '../archivos/',coleccion, modelo.img);

        if (fs.existsSync(pathImage)){
            fs.unlinkSync(pathImage);
        }
    }



    const nombre = await subirArchivo(req.files, undefined, coleccion);

    modelo.img = nombre;
    await modelo.save();
    res.json({
        modelo
    })
}

const updateImageCloudinary = async (req,res) => {

    const {id,coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg:'No existe un usuario con ese id'
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg:'No existe un producto con ese id'
                })
            }
            break;
        default:
            return res.status(500).json({
                msg:'Esa coleccion no está contemplada'
            })
    }


    if(modelo.img){
        const nombreSplit = modelo.img.split('/');
        const nombre = nombreSplit[nombreSplit.length-1];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    modelo.img = secure_url;
    await modelo.save();
    res.json({
        modelo
    })
}

const showImage = async (req,res) => {

    const {id,coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg:'No existe un usuario con ese id'
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg:'No existe un producto con ese id'
                })
            }
            break;
        default:
            return res.status(500).json({
                msg:'Esa coleccion no está contemplada'
            })
    }

    //Limpiar imagenes previas
    if(modelo.img){
        //Borrar la imagen del servidor
        const pathImage = path.join(__dirname, '../archivos/',coleccion, modelo.img);

        if (fs.existsSync(pathImage)){
            return res.sendFile(pathImage)
        }
    }

    const pathNoImage = path.join(__dirname, '../assets/img.png');
    res.sendFile(pathNoImage);
}
module.exports = {
    uploadFile,
    updateImage,
    showImage,
    updateImageCloudinary
}