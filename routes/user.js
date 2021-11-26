const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {
    esRolValido,
    esEmailValido,
    existID } = require('../helpers/db-validators');

const {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
} = require('../controllers/user');

const router = Router();

router.get('/', userGet)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de 6 mas de caracteres').isLength({ min: 6 }),
    check('correo', 'el correo no es valido').isEmail(),
    check('correo').custom(esEmailValido),
    check('rol').custom(esRolValido),
    validarCampos
],
    userPost
);

router.put('/:id',
    [
        check('id', "No es un ID valido").isMongoId(),
        check('id').custom(existID),
        check('rol').custom(esRolValido),
        validarCampos
    ],
    userPut
);


router.delete('/:id',
    [
        check('id', "No es un ID valido").isMongoId(),
        check('id').custom(existID),
        validarCampos
    ],
    userDelete
);


router.patch('/', userPatch)



module.exports = router;