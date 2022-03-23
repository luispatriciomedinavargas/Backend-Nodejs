const { Router } = require('express');
const { check } = require('express-validator');



const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

/**
 * 
 * @swagger
 * components:
 *  schemas:
 *    User:
 *       type: object
 *       properties:
 *          correo:
 *            type: string
 *            description: the user's correo
 *          password:
 *            type: string
 *            description: the user's password
 *       required:
 *         - correo
 *         - password
 *       example:
 *         correo: luispatriciomedinavargas@gmail.com
 *         password: 123456789
 */
/**
 * 
 * 
 * 
 * 
 * @swagger
 *  /api/login:
 *   post:
 *       summary: login to application
 *       tag: [User]
 *       requestBody:
 *          required: true
 *          content: 
 *            application/json: 
 *              schema:
 *                 type: object
 *                 $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *          description: you can acces!

 */
router.post('/login',
    [
        check('correo', 'The correo can not be empty').isEmail(),
        check('password', 'The password can not be empty').not().isEmpty(),
        validarCampos
    ],
    login)





module.exports = router;