const { Categoria } = require("../models");
const categorie = require("../models/categorie");
const query = ({ state: true });
const allCategoriesRepository= async (limit,skip) => {
    const [all, categories] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(skip))
            .limit(Number(limit))
            .populate('usuario', 'nombre')
    ])
    const allCategories={
        all,
        categories
    }
    return allCategories;
}

const categorieByIDRepository=async(id)=>{

    const categorieById=await  Categoria.findById(id).populate('usuario', 'nombre').where(query);
    return categorieById;

}


const createCategorieRepository=async(data)=>{

    const createCategorie=await Categoria.create(data);
    createCategorie.save();
    return createCategorie;
}

const updateCategorieRepository=async(id,data)=>{
    
    const updateCategorie=await Categoria.findByIdAndUpdate(id,data,{ new : true });

    updateCategorie.save();
    return updateCategorie;
}


const deleteCategoriRepository=async(id,state)=>{
    const deleteCategorie=await Categoria.findByIdAndUpdate(id,{state})
    deleteCategorie.save();

    return deleteCategorie;
}



module.exports={
    allCategoriesRepository,
    categorieByIDRepository,
    createCategorieRepository,
    updateCategorieRepository,
    deleteCategoriRepository
}