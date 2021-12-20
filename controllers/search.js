const { request, response } = require("express");
var { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Product } = require('../models/index')
const coleccionesPerimitidas = [
    'categories',
    'products',
    'roles',
    'usuarios'

];

const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); // TRUE 

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });



}

const buscarCategoria = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); // TRUE 

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    const categorias = await Categoria.find({
        $or: [{ name: regex, estado: true }]
    });

    res.json({
        results: categorias
    });



}

const buscarProducto = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); // TRUE 

    if (esMongoID) {
        const producto = await Product.findById(termino).populate('categoria', 'name')
            .populate('usuario', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    const productos = await Product.find({
        $or: [{ name: regex }, { estado: true }]
    }).populate('categoria', 'name')
        .populate('usuario', 'nombre');

    res.json({
        results: productos
    });



}

const search = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPerimitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPerimitidas}`
        })
    }


    switch (coleccion) {
        case 'categories':
            buscarCategoria(termino, res)
            break;

        case 'products':
            buscarProducto(termino, res)
            break;

        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        default:
            res.status(500).json({
                msg: 'does not exist that coleccion'
            })
    }
};

module.exports = {
    search
}