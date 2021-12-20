const { Router } = require('express');
const { check } = require('express-validator');
const { createCategorie, getAllCategories, updateCategorie, deleteCategoria, getCategoriaById } = require('../controllers/categories');

const { validarJWT, validarCampos, checkRol, hasRole } = require('../middlewares');
const { existCategoriaID, } = require('../helpers/db-validators')
const router = Router();

/*{{url}}/api/categories */

//Obtener todas las categorias/Get all categories - public
router.get('/',
    getAllCategories
);

//Obtener una categoria por id/Get a categories by id - public
router.get('/:id',
    [
        check('id', 'is not ID').isMongoId(),
        check('id').custom(existCategoriaID),
        validarCampos
    ],
    getCategoriaById
);

//Create categoria/Create a categoria - private
router.post('/', [
    validarJWT,
    check('name', 'The name is required').not().isEmpty(),
    validarCampos
], createCategorie

);

//actualizar un registro por id/update a register by id - private
router.put('/:id', [
    validarJWT,
    // check('id', 'this ID is not valid').isMongoId(),
    check('id',).custom(existCategoriaID),
    check('name', 'the name must be required ').notEmpty(),
    validarCampos
], updateCategorie
);

//eliminar una categoria por id, estado=false/delete a category by id, estado=false - ONLY ADMIN
router.delete('/:id', [
    validarJWT,
    check('id', 'this ID is not valid').isMongoId(),
    check('state', 'the state is require - middleware').notEmpty(),
    checkRol,
    validarCampos,
    hasRole
], deleteCategoria);

module.exports = router;