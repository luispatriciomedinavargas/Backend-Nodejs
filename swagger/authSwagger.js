

//=============== SCHEMAS ================================
//=============== SCHEMAS ================================
//=============== SCHEMAS ================================
//=============== SCHEMAS ================================
//=============== SCHEMAS ================================
//=============== SCHEMAS ================================

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *       type: object
 *       properties:
 *          correo:
 *            type: string
 *            description: the user's correo
 *          name:
 *            type: string
 *            description: the user's name
 *          password:
 *            type: string
 *            description: the user's password
 *          img:
 *            type: string
 *            description: the user's img
 *          rol:
 *            type: string
 *            description: the user's rol
 *          estado:
 *            type: Bolean
 *            description: if the user is delete or no
 *          google:
 *            type: Bollean
 *            description: if the user has google sing
 *       required:
 *         - correo
 *         - password
 *       example:
 *         "correo" : "test1@test.com"
 *         "password" : "123456"
 */



//=============== PATH ================================
//=============== PATH ================================
//=============== PATH ================================
//=============== PATH ================================
//=============== PATH ================================
//=============== PATH ================================

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *       summary: login to application
 *       tags: [User]
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

//=============== PATH END ================================
//=============== PATH END ================================
//=============== PATH END ================================
//=============== PATH END ================================
//=============== PATH END ================================
//=============== PATH END ================================
