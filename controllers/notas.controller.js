const { Nota } = require('../models');



const addNote = async (req,res) => {

    const body = req.body;

    body.usuarioId = req.usuario.id;
    try {
        const notaBD = await Nota.create(body);

        res.status(200).json(notaBD);

    } catch (error) {
        return res.status(500).json(
            {msg: 'Ha ocurrido un error',
                error
            });
    }
}

const obtainNota = async (req,res) => {

    const { id } = req.params;
    try {
        const notaBD = await Nota.findById(id);

        res.json(notaBD);

    } catch (error) {
        return res.status(400).json(
            {msg: 'Ha ocurrido un error',
                error
            });
    }
}

const obtainNotas = async (req,res) => {

    try {
        const notasBD = await Nota.find({usuarioId:req.usuario.id});

        res.json(notasBD);

    } catch (error) {
        return res.status(400).json(
            {msg: 'Ha ocurrido un error',
                error
            });
    }
}

const deleteNota = async (req,res) => {

    const { id } = req.params;

    try {
        const notaBD = await Nota.findByIdAndDelete(id);
        if(!notaBD){
            return res.status(400).json(
                {msg: 'No existe esa nota'
                });
        }
        res.json(notaBD);

    } catch (error) {
        return res.status(400).json(
            {msg: 'Ha ocurrido un error',
                error
            });
    }


}

const updateNota = async (req,res) => {
    const {id} = req.params;
    const body = req.body;
    console.log({body})
    console.log(body)
    try {
        const notaBD = await Nota.findByIdAndUpdate(id, body,{new:true});

        res.json(notaBD);

    } catch (error) {
        return res.status(400).json(
            {msg: 'Ha ocurrido un error',
                error
            });
    }
}

module.exports = {
    addNote,
    obtainNota,
    obtainNotas,
    deleteNota,
    updateNota
}
