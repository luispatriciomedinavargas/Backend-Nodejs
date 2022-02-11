const { Router } = require('express');
const { check } = require('express-validator');
const { getProducto,
    deleteProducto,
    getProductoById,
    createProducto,
    putProducto, } = require('../controllers/product');
const { validarCampos, validarJWT, hasRole } = require('../middlewares');
const { existProductoByID } = require('../helpers/db-validators');
const router = Router();


router.get('/', [
], getProducto);

router.get('/:id',
    [
        validarJWT,
        check('id', 'Please check he ID that is not a valid ID').isMongoId(),
        check('id').custom(existProductoByID),
        validarCampos
    ],
    getProductoById);

router.post('/', [
    validarJWT,
    check('name', 'the name is required').notEmpty(),
    check('name', 'the name is required').isString(),
    check('categoria', 'must be required ').isMongoId(),
    check('price', 'is a number.').isNumeric(),
    hasRole('USER_ROLE', 'ADMIN_ROLE', 'VENTAS_ROLE'),
    validarCampos

], createProducto);


router.put('/:id', [
    validarJWT,
    check('categoria', 'must be required ').isMongoId(),
    check('id').custom(existProductoByID),
    check('price', 'Please put the name').not().isString(),
    validarCampos
], putProducto);

router.delete('/:id', [
    validarJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'Id is required ').isMongoId(),
    check('id').custom(existProductoByID),
    validarCampos
],
    deleteProducto
);


module.exports = router;
