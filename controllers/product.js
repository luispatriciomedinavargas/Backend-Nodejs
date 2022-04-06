const { response, request } = require("express");
const { checkStock, checkAmount } = require("../helpers");
const { Product } = require('../models/index');
const SellProducto = require("../models/sellProducto");



const createProducto = async (req = request, res = response) => {
    const { _id } = req.usuario;
    const { name, categoria, stock } = req.body;
    const data = {
        name,
        categoria,
        usuario: _id,
        stock
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


    const getAllProducto = await Product.find(query).skip(skip).limit(limit);

    res.status(201).json({
        getAllProducto
    })

}

const getProductoById = async (req = request, res = response) => {
    const { id } = req.params;

    const getProductoById = await Product.findById(id).populate('categoria', 'name')
        .populate('usuario', 'nombre');
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

    res.json({
        msg: 'Producto - put ',
        updateProducto
    })
}

const deleteProducto = async (req = request, res = response) => {

    const { id } = req.params;


    const deleteProd = await Product.findByIdAndUpdate(id, query, { new: true });
    res.json({
        msg: 'Product exitosamente was  delete',
        deleteProd
    })

}
const sellProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id } = req.usuario;
    const { stockProducto } = req.body;
    const findProducto = await Product.findById(id);
    const { price, stock } = findProducto;
    checkStock(stock)
    checkAmount(stockProducto, stock)
    const finalStock = stockProducto - stock;
    const updateproduct = await Product.findByIdAndUpdate(id, { stock: finalStock }, { new: true });
    updateproduct.save();
    const FinalPriceByStock = stockProducto * price;

    const sellProducto = await SellProducto.create({
        price: FinalPriceByStock,
        products: id,
        usuario: _id,
        descripcion: '',
        stockSell: stockProducto,
    })
    return res.status(200).json({
        msg: 'ok',
        sellProducto,
        updateproduct
    })
}
module.exports = {
    getProducto,
    deleteProducto,
    getProductoById,
    createProducto,
    putProducto,
    sellProducto
}

