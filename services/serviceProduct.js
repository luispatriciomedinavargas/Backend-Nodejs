const { query } = require("../helpers");
const { Product } = require("../models");
const { createProductoRepository } = require("../repository/repositoryProducto");



 const createProductoService=async(data)=>{
  const createProducto = await createProductoRepository(data);
  return createProducto;
 }
 const getAllProductoService=async(skip,limit)=>{
const getAllProducto=await getAllProductoRepository(skip,limit)
return getAllProducto;
 }
 const getByIdProductoService=async(id)=>{
const getByIdProducto=await getProductoByIdRepository(id)
return getByIdProducto;
 }
 const putProductoService=async(id,data)=>{
const putProducto=await Product.findByIdAndUpdate(id,data,{new:true});
return putProducto;
 }
 const deleteProductoService=async(id)=>{
    const deleteProducto=await Product.findByIdAndUpdate(id,{state:false},{new:true});
    return deleteProducto
 }

module.exports={
    createProductoService,
    getAllProductoService,
    getByIdProductoService,
    putProductoService,
    deleteProductoService
}
