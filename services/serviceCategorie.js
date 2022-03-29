const { allCategoriesRepository, categorieByIDRepository, createCategorieRepository, updateCategorieRepository, deleteCategoriRepository } = require("../repository/repositoryCategorie")


const serviceAllCategories=(limit,skip)=>{
    return allCategoriesRepository(limit,skip)
}

const serviceCategorieById=(id)=>{
    return categorieByIDRepository(id)
}

const serviceCreateCategorie=(data)=>{
    return createCategorieRepository(data)
}

const serviceUpdateCategorie=(id,data)=>{
    return updateCategorieRepository(id,data)
}

const serviceDeleteCategorie=(id,state)=>{
    return deleteCategoriRepository(id,state);
}

module.exports={
    serviceAllCategories,
    serviceCategorieById,
    serviceCreateCategorie,
    serviceUpdateCategorie,
    serviceDeleteCategorie
}