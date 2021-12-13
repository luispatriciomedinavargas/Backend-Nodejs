const { response, request } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    const usuario = await Usuario.findOne({
        correo
    })
    //Verificar si el email existe
    if (!usuario) {
        return res.status(400).json({
            msg: 'Usuario / Password are not correct, please check it'
        })
    }




    //verificar si el usuario esta activo 
    if (!usuario.estado) {
        return res.status(400).json({
            msg: 'Usuario / Password are not correct, - estado: false'
        })
    }
    //verificar la contrasenia 
    const validPassword = bcryptjs.compareSync(password, usuario.password)


    if (!validPassword) {
        return res.status(400).json({
            msg: 'Usuario / Password are not correct, - password'
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