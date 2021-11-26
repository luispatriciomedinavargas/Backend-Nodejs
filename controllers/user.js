const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require("../models/usuario");


const userGet = async (req = request, res = response) => {
    const { limit = 5, skip = 0 } = req.query;

    //here we put a filter for get all user with estado in true
    const query = ({ estado: true });

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(skip))
            .limit(Number(limit))
    ])

    res.json({
        total,
        usuarios
    });
}

const userPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Verificar si el correo existe



    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await usuario.save();

    res.status(400).json({
        okay: true,
        usuario

    });
}

const userPut = async (req = req, res = response) => {


    const { id } = req.params;
    const { password, google, correo, ...rest } = req.body;
    //TODO validar ocntra BD
    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);

    }
    const usuarioDB = await Usuario.findByIdAndUpdate(id, rest);


    res.json({
        okay: true,
        usuarioDB
    });
}

const userPatch = (req = req, res = response) => {

    res.status(400).json({
        okay: true,
    });
}

const userDelete = async (req, res = response) => {

    const { id } = req.params;
    //Fisicamente lo borramos

    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        usuario
    });
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}