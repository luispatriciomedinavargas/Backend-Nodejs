const { Router } = require('express');
const { check } = require('express-validator');
const {
    sellProducto } = require('../controllers/product');
const { validarCampos, validarJWT, hasRole } = require('../middlewares');
const { existProductoByID, checkPrice } = require('../helpers/db-validators');
const router = Router();

router.put('/:id', [
    validarJWT,
    hasRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'id is required ').isMongoId(),
    check('id').custom(existProductoByID),
    check('priceProduct').custom(checkPrice),
    validarCampos
],
    sellProducto
);


module.exports = router;
