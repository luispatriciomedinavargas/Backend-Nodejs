const { query } = require("../helpers");
const { Product } = require("../models");

const createProductoRepository=async(data)=>{
const createProducto=await Product.create(data);
return createProducto;
}
query

const getAllProductoRepository=async(skip,limit)=>{
    const getAllProducto=await Product.find(query).skip(skip)
    .limit(limit)
    return getAllProducto;
}

const getProductoByIdRepository=async(id)=>{
    const getProductoById=await Product.findById(id).populate('categoria', 'name')
    .populate('usuario', 'nombre');
return getProductoById;
}

const deleteProductoRepository=async(id)=>{
    const deleteProducto=await Product.findByIdAndUpdate(id,query,{new:true});
    return deleteProducto
}



module.exports={
createProductoRepository,
getProductoRepository: getAllProductoRepository,
getProductoByIdRepository,
deleteProductoRepository
}