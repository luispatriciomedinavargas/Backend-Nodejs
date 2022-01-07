const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const checkRol = require('../middlewares/validar-rol');
const verificarArchivo = require('../middlewares/verificarArchivo')



module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...checkRol,
    ...verificarArchivo
}