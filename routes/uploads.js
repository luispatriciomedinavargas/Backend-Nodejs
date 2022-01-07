const { Router } = require('express');

const { check } = require('express-validator');

const { cargarArchivo, mostrarImage, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const { validarCampos, verificarArchivo } = require('../middlewares')



const router = Router();

router.post('/', [
    verificarArchivo,
    validarCampos
], cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', 'el ID no es valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    verificarArchivo,
    validarCampos
], actualizarImagenCloudinary);

router.get('/:coleccion/:id', [

    check('id', 'el ID no es valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImage)
module.exports = router; 