const { response } = require("express");
const { serviceAllCategories, serviceCategorieById, serviceCreateCategorie, serviceUpdateCategorie, serviceDeleteCategorie } = require("../services/serviceCategorie");



//getCategorias - paginado - total - populate relacion entre el ID y usuario,
const getAllCategories = async (req, res = response) => {
    const { limit = 5, skip = 0 } = req.query;

 const{all,categories}= await serviceAllCategories(limit,skip)

 return res.status(200).json({
     all,
     categories
 })
}


//getCategoria - populate {categoria}
const getCategoriaById = async (req, res = response) => {
    const { id } = req.params;


const categorieById=await serviceCategorieById(id);

    return res.status(200).json({
        categorieById
    })


}



const createCategorie = async (req, res = response) => {

    const name = req.body.name.toUpperCase();
  
    //generar la data a guardar
    const data = {
        name,
        usuario: req.usuario._id
    }
    const categorie = await serviceCreateCategorie(data)


   return res.status(201).json({
        categorie
    });

}

//updateCategorie

const updateCategorie = async (req, res = response) => {

    const { id } = req.params
    const { state, usuario, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.usuario = req.usuario._id;
    
    const updateCategorie = await serviceUpdateCategorie(id,data);
   return res.status(200).json({
        updateCategorie
    })

}


// deleteCategorie - estado: false
const deleteCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { state } = req.body;


 await serviceDeleteCategorie(id,state)

    res.status(200).json({
        msg: 'ok, it was deleted successfully',

    })

}

module.exports = {
    createCategorie,
    getAllCategories,
    updateCategorie,
    deleteCategoria,
    getCategoriaById
}