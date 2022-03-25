const { response } = require("express");
const { Categoria } = require('../models');

const query = ({ state: true });

//getCategorias - paginado - total - populate relacion entre el ID y usuario,
const getAllCategories = async (req, res = response) => {
    const { limit = 5, skip = 0 } = req.query;



    const [all, categories] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(skip))
            .limit(Number(limit))
            .populate('usuario', 'nombre')
    ])
    res.status(200).json({
        all,
        categories
    })

}


//getCategoria - populate {categoria}
const getCategoriaById = async (req, res = response) => {
    const { id } = req.params;



    const getCategoria = await Categoria.findById(id).populate('usuario', 'nombre').where(query);


    return res.status(200).json({
        getCategoria
    })


}



const createCategorie = async (req, res = response) => {

    const name = req.body.name.toUpperCase();
    const categoriaDB = await Categoria.findOne({ name });
    if (categoriaDB) {
        return res.status(400).json({
            msg: `the categorie ${name} already exist.`
        });
    }
    //generar la data a guardar

    const data = {
        name,
        usuario: req.usuario._id
    }
    const categorie = await new Categoria(data);
    await categorie.save();


    res.status(201).json(categorie);

}

//updateCategorie

const updateCategorie = async (req, res = response) => {

    const { id } = req.params
    const { state, usuario, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.usuario = req.usuario._id;
    const updateCategorie = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
        updateCategorie
    })

}


// deleteCategorie - estado: false
const deleteCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { state } = req.body;

    if (state) {
        return res.json({
            msg: 'the state must be false'
        })
    }
    await Categoria.findByIdAndUpdate(id, { state });


    const showdeleteCategorie = await Categoria.findById(id);

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