const {Informe} = require("../models");

/***
 * Funcion que añade un informe que crea un medico en la base de datos
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const addInforme = async (req,res) => {
    //Se recogen todos los datos del body
    const body = req.body;

    try {
        //Se crea un informe con los datos enviados
        const informeBD = await Informe.create(body);

        //Se envia el informe en formato json, de lo contrario se manda un error
        res.status(200).json(informeBD);

    } catch (error) {
        return res.status(500).json(
            {msg: 'Ha ocurrido un error',
                error
            });
    }
}

/**
 * Funcion que devuelve todos los informes de un paciente en especifico
 * @param req
 * @param res
 * @returns {Object}
 */
const getInformes = async (req,res) =>{

    try{
        //Devuelve todos los informes que coinciden con el nombre del paciente
        const informes = await Informe.find({usuario:req.params.usuario});
        //Devuelve todos los informes en formato json y en caso contrario devuelve un error
        res.status(200).json({informes});
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            {msg: 'Ha ocurrido un error',
                error
            });
    }

}

//Se exportan todas las funciones
module.exports = {
    addInforme,
    getInformes
}
