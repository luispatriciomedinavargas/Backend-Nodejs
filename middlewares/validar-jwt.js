const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {


    const token = req.header('x-token');
    const secretkey = process.env.SECRETORPRIVATEKEY;

    if (!token) {
        return res.status(401).json({
            msg: 'does not exist token in the request.'
        });
    }

    try {

        const { uid } = jwt.verify(token, secretkey);

        const userAuth = await Usuario.findById(uid);



        //Verificar si el uid tiene estado true
        if (!userAuth.estado) {
            return res.status(401).json(
                {
                    msg: 'that is User is deleted, please check it - estado is not Valid'
                }
            )
        }

        req.usuario = userAuth;

        next();
    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'invalid token.'
        })
    }


}

module.exports = { validarJWT }