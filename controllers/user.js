const { response, request } = require('express');
const { req } = require('express');



const userGet = (req = request, res = response) => {


    const { q, nombre = 'no name', apikey, limit, page = 1 } = req.query;
    res.status(400).json({
        okay: true,
        message: 'Get api - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}
const userPost = (req, res = response) => {

    // const { nombre, edad } = req.body
    const body = req.body
    res.status(400).json({
        okay: true,
        message: 'Post api - Controlador',
        body
    });
}

const userPut = (req = req, res = response) => {


    const id = req.params.id;

    res.status(400).json({
        okay: true,
        message: 'Put api - Controlador',
        id
    });
}

const userPatch = (req = req, res = response) => {

    res.status(400).json({
        okay: true,
        message: 'Patch api - Controlador'
    });
}

const userDelete = (req, res = response) => {

    res.status(400).json({
        okay: true,
        message: 'Delete api - Controlador'
    });
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}