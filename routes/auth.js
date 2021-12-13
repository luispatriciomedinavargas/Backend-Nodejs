const { Router } = require('express');
const { check } = require('express-validator');



const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/login',
    [
        check('correo', 'The email can not be empty').isEmail(),
        check('password', 'The password can not be empty').not().isEmpty(),
        validarCampos
    ],
    login)


module.exports = router;