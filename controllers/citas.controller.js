const {Cita} = require("../models");

/**
 * Funcion que añade una cita al modelo Cita con todos los datos que se envian en el body
 * @param req
 * @param res
 * @returns {Object}
 */
const addCita = async (req,res) => {

    //Aqui se guardan los datos del body
    const body = req.body;

    try {
        //Se crea la cita con los datos enviados
        const citaBD = await Cita.create(body);

        //Si no se produce ningun error se reenvia la cita
        res.status(200).json(citaBD);

        //Si algo sale mal se manda un mensaje de error 500
    } catch (error) {
        return res.status(500).json(
            {msg: 'Ha ocurrido un error',
                error
            });
    }
}


/**
 * Funcion que devuelve todas las citas de un paciente
 * @param req
 * @param res
 * @returns {Object}
 */
const getCitas = async (req,res) =>{

    try{
        //Encuentra todas las citas que coincidan con el id del paciente
        const citas = await Cita.find({usuarioId:req.params.usuarioId});

        //Devuelve el total de citas que tiene ese paciente
        const total = await Cita.find({usuarioId:req.params.usuarioId}).countDocuments();

        //Envia las citas
        res.status(200).json({citas, total});

        //Si algo sale mal envia un error 500
    } catch (error) {
        return res.status(500).json(
            {msg: 'Ha ocurrido un error',
                error
            });
    }

}

/**
 * Funcion que devuelve todas las citas que tiene un medico pendientes
 * @param req
 * @param res
 * @returns {Object}
 */
const obtainCitas = async (req,res) => {
    //Se recibe el nombre del medico a traves de la url como parametro
    const doctor = req.params.doctor;

    try {
        //Se busca en el modelo Usuario todos los pacientes que tienen asignado ese medico
        const citasDB = await Cita.find({doctor:doctor});

        res.json({citasDB});
        //Si algo sale mal se envia un error 500 ya que es debido a problemas con el servidor
    } catch (error) {
        return res.status(500).json(
            {msg: 'Ha ocurrido un error',
                error
            });
    }
}

//Exportacion de las funciones
module.exports = {
    addCita,
    getCitas,
    obtainCitas
}
