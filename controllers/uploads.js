const path = require("path");
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response, request } = require("express");

const { subirArchivo } = require("../helpers");
const { Usuario, Product } = require('../models')

const cargarArchivo = async (req = request, res = response) => {

    const file = req.files


    try {
        // const nombre = await subirArchivo(file, ['txt', 'md'], 'textos');
        const nombre = await subirArchivo(file, undefined, 'imgs');


        res.json({
            nombre
        })
    } catch (msg) {
        res.status(400).json({
            msg
        })
    }
}


const actualizarImagen = async (req = request, res = response) => {


    const { coleccion, id } = req.params;
    let modelo;
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }

            break;

        case 'productos':
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({
                msg: 'se me olvido validar eso'
            })
    }


    //Limpiar imagenes previas
    if (modelo.img) {
        //Borrar la imagen del servidor

        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }
    const nombre = await subirArchivo(req.files, undefined, coleccion);

    modelo.img = nombre;

    await modelo.save();

    res.json({
        modelo
    })

}

const actualizarImagenCloudinary = async (req = request, res = response) => {


    const { coleccion, id } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }

            break;

        case 'productos':
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({
                msg: 'se me olvido validar eso'
            })
    }


    //Limpiar imagenes previas
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }


    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;

    await modelo.save();

    res.json({
        modelo
    })

}

const mostrarImage = async (req = request, res = response) => {


    const { coleccion, id } = req.params;
    const NoImageFound = path.join(__dirname, '../assets/no-image.jpg');
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }

            break;

        case 'productos':
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({
                msg: 'se me olvido validar eso'
            })
    }
    return res.status(200).json(modelo.img)

}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImage,
    actualizarImagenCloudinary
}