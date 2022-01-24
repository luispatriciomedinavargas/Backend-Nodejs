const { response, request } = require("express");
const { Product } = require('../models/index');



const createProducto = async (req = request, res = response) => {
    const { _id } = req.usuario;
    const { name, categoria } = req.body;
    const data = {
        name,
        categoria,
        usuario: _id
    }
    const createProducto = await Product(data);

    await createProducto.save();
    res.status(201).json({
        msg: 'congratulations you make a new producto.',
        newProducto: createProducto
    })
}

const getProducto = async (req = request, res = response) => {

    const { limit, skip } = req.params;

    const query = ({ state: true });

    const getAllProducto = await Product.find(query).skip(skip).limit(limit);

    res.status(201).json({
        getAllProducto
    })

}

const getProductoById = async (req = request, res = response) => {
    const { id } = req.params;

    const getProductoById = await Product.findById(id).populate('categoria', 'name')
        .populate('usuario', 'nombre');
    console.log(getProducto);
    return res.status(200).json(
        {
            getProductoById
        }
    )
}



const putProducto = async (req = request, res = response) => {

    const { id } = req.params;

    const { _id } = req.usuario;

    const { name, price, categoria, descripcion, disponible } = req.body;

    console.log(req.params)

    const data = {
        name,
        price,
        categoria,
        descripcion,
        disponible,
        usuario: _id
    }
    const updateProducto = await Product.findByIdAndUpdate(id, data).populate('categoria', 'name')
        .populate('usuario', 'nombre');

    console.log(updateProducto)

    res.json({
        msg: 'Producto - put ',
        updateProducto
    })
}

const deleteProducto = async (req = request, res = response) => {

    const { id } = req.params;

    const query = { state: false };

    const deleteProd = await Product.findByIdAndUpdate(id, query, { new: true });




    res.json({
        msg: 'Product exitosamente was  delete',
        deleteProd
    })

}

module.exports = {
    getProducto,
    deleteProducto,
    getProductoById,
    createProducto,
    putProducto
}

