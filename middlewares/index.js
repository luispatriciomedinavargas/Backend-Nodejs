const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const checkRol = require('../middlewares/validar-rol');
const verificarArchivo = require('../middlewares/verificarArchivo')
const { validationResult } = require('express-validator')

const errorWrapperFunction = (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty()
    if (hasErrors) {
      return res.status(422).json({ errorList: result.array() });
    }
    next();
  };

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...checkRol,
    ...verificarArchivo,
    errorWrapperFunction
}

