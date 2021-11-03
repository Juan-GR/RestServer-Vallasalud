const jwt = require('jsonwebtoken');
const {response, request} = require("express");

const jwtValidator = async (req = request, res = response, next) => {

    const token = req.header('userToken');
    if(!token){
        return res.status(401).json({
            msg: 'Usuario no loggeado'
        })
    }
    
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY );
        req.uid = uid;
        next();
    }catch (e) {
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }
}


module.exports = {
    jwtValidator
}