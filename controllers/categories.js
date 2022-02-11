const { response } = require("express");
const { Categoria } = require('../models');


//getCategorias - paginado - total - populate relacion entre el ID y usuario,
const getAllCategories = async (req, res = response) => {
    const { limit = 5, skip = 0 } = req.query;


    const query = ({ state: true });

    const [all, categories] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(skip))
            .limit(Number(limit))
            .populate('usuario', 'nombre')
    ])
    res.json({
        all,
        categories
    })

}


//getCategoria - populate {categoria}
const getCategoriaById = async (req, res = response) => {
    const { id } = req.params;


    if (!id) {
        return res.json({
            msg: 'please put a id'
        })
    }
    const getCategoria = await Categoria.findById(id).populate('usuario', 'nombre');

    return res.json({
        categoria: getCategoria
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
    console.log(id);
    const { state, usuario, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.usuario = req.usuario._id;
    const updateCategorie = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json({
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

    res.json({
        showdeleteCategorie
    })
}

module.exports = {
    createCategorie,
    getAllCategories,
    updateCategorie,
    deleteCategoria,
    getCategoriaById
}