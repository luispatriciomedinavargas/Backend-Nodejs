const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { serviceExistUser, serviceValidPass } = require("../services/serviceAuth");
serviceExistUser

const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    const usuario = await serviceExistUser(correo);

    if (!usuario.estado) {
        return res.status(400).json({
            msg: 'the user is deleted'
        })
    }

    //verificar la contrasenia 
    const validPassword = serviceValidPass(password, usuario)

    if (!validPassword) {
        return res.status(400).json({
            msg: 'the password or the email is wrong please check it'
        })
    }

    try {
        //generar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token,
            msg: 'login OK'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                msg: 'algo salio mal'
            }
        );
    }


}

module.exports = {
    login
}