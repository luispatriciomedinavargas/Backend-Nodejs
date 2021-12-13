const { request, response } = require("express");
const rol = require("../models/rol");
const Usuario = require('../models/usuario');

const checkRol = async (req = request, res = response, next) => {


    if (!req.usuario) {
        return res.status(500).json({
            msg: 'wants check the rol without token, check it please'
        })
    }
    const { rol, name } = req.usuario;
    console.log(rol);

    if (rol !== 'ADMIN_ROLE') {
        return res.status(404).json({
            msg: `${name} does not have permissions to change`
        })
    }
    next();
}

const hasRole = (...roles) => {

    return (req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'wants check the rol without token, check it please'
            })
        }
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `The service needs one of them ${roles}`
            })

        }
        next();
    }
}

module.exports = {
    checkRol,
    hasRole
}