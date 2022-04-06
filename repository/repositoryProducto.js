const { query } = require("../helpers");
const { Product } = require("../models");

const createProductoRepository=async(data)=>{
const createProducto=await Product.create(data);
return createProducto;
}
query

const getProductoRepository=async()=>{
    const getAllProducto=await Product.find(query)
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
getProductoRepository,
getProductoByIdRepository,
deleteProductoRepository
}