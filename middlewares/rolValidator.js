/**
 * Funcion que valida si un usuario es admin o no
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const isAdminRole = (req,res,next) => {
    /* Como el middleware JWTValidator ya introduce en la req el req.usuario y es el primero en ejecutarse
    * no es necesario hacer todo el proceso de llamar a la base de datos, coger los datos del usuario etc
    */
    if(!req.usuario) {
        return res.status(500).json({
            msg: 'Se está verificando el rol antes de verificar el token'
        })
    }
    const { rol, nombre } = req.usuario;
    if ( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es un usuario ADMINISTRADOR`
        })
    }
    next();
}

/**
 * Funcion que valida un rol que tiene un usuario
 * @param roles
 * @returns {Object}
 */
const verifyRol = (...roles) => {
    return ( req,res,next ) => {

        if(!req.usuario) {
            return res.status(500).json({
                msg: 'Se está verificando el rol antes de verificar el token'
            })
        }
        if(!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El usuario no tiene los roles necesarios: ${roles} para realizar la accion`
            })
        }
        next();
    }
}




module.exports = {
    isAdminRole,
    verifyRol
}
