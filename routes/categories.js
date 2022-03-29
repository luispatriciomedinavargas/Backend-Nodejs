const { Router } = require('express');
const {  } = require('express-validator');
const { createCategorie,
    getAllCategories,
    updateCategorie, deleteCategoria, getCategoriaById } = require('../controllers/categories');

const { categoriesGetById, categoriesPost, categoriesPut, categoriesDelete } = require('../middlewares/categoriesMiddleware');
const router = Router();

/*{{url}}/api/categories */

//Obtener todas las categorias/Get all categories - public
router.get('/', getAllCategories);

//Obtener una categoria por id/Get a categories by id - public
router.get('/:id', categoriesGetById, getCategoriaById);

//Create categoria/Create a categoria - private
router.post('/', categoriesPost, createCategorie);

//actualizar un registro por id/update a register by id - private
router.put('/:id', categoriesPut, updateCategorie);

//eliminar una categoria por id, estado=false/delete a category by id, estado=false - ONLY ADMIN

router.delete('/:id', categoriesDelete, deleteCategoria)

module.exports = router;