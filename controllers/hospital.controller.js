const {Doctor, Usuario} = require("../models");
const {response} = require("express");
const {encriptarPassword} = require("../helpers/db-validators");


/**
 * Funcion que devuelve a todos los médicos que hay en un hospital en especifico
 * @param req
 * @param res
 * @returns {Object}
 */
const obtainDoctorsByHospital = async (req,res) => {

    //Se guarda en la variable el hospital del que se quieren todos los medicos
    const hospital = req.params.hospital;

    try {
        //Busca todos los medicos que esten en el hospital indicado en la variable y los devuelve
        const DoctorsBD = await Doctor.find({hospital});
        res.json({DoctorsBD});

        //Si ocurre un error lo devuelve
    } catch (error) {
        return res.status(500).json(
            {msg: 'Ha ocurrido un error',
                error
            });
    }
}

/**
 * Funcion que devuelve todos los pacientees que estan vinculados a un medico
 * @param req
 * @param res
 * @returns {Object}
 */
const obtainPatientsByDoctor = async (req,res) => {
    //Se recibe el nombre del medico a traves de la url como parametro
    const doctor = req.params.doctor;

    try {
        //Se busca en el modelo Usuario todos los pacientes que tienen asignado ese medico
        const patientsDB = await Usuario.find({medico:doctor});
        //Se devuelven el total de pacientes asignados a ese medico y se envia el array de pacientes y el total
        const total = await Usuario.find({medico:doctor}).countDocuments();
        res.json({patientsDB,total});
    //Si algo sale mal se envia un error 500 ya que es debido a problemas con el servidor
    } catch (error) {
        return res.status(500).json(
            {msg: 'Ha ocurrido un error',
                error
            });
    }
}


/**
 *
 * Esta funcion crea usuarios con rol de doctor
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const postDoctor =async (req, res = response) => {

    //Se recogen todos los parametros enviados en el body
    const { nombre,email,password,hospital,especialidad } = req.body;

    //Se crea un nuevo Doctor
    const doctor = new Doctor({nombre,email,password,hospital,especialidad});

    //Se encripta la contraseña que se almacenará en la base de datos
    encriptarPassword(doctor,password);

    //Guardar el objeto en la base de datos
    await doctor.save();

    //Se devuelve el objeto en formato json
    res.json({
        doctor
    });
}

//Se exportan las funciones
module.exports = {
    obtainDoctorsByHospital,
    postDoctor,
    obtainPatientsByDoctor,
}
