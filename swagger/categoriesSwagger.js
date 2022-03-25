

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
 *    Categorie:
 *       type: object
 *       properties:
 *          name:
 *            type: string
 *            description: the categorie's name
 *          state:
 *            type: boolean
 *            description: the categorie's state       if    it is deleted or not
 *       required:
 *         - nane
 *         - state
 */
//=============== SCHEMAS END ================================
//=============== SCHEMAS END ================================
//=============== SCHEMAS END ================================
//=============== SCHEMAS END ================================
//=============== SCHEMAS END ================================
//=============== SCHEMAS END ================================






//=============== PATH ================================
//=============== PATH ================================
//=============== PATH ================================
//=============== PATH ================================
//=============== PATH ================================
//=============== PATH ================================
/** ------------- GET ALL ----------------------------
 * @swagger
 * /api/categories/:
 *   get:
 *       summary: access to see all categories
 *       tags: [Categorie]
 *       responses:
 *         200:
 *          description: you can see al categories!
 */


/** --------------Get By ID------------------------------
 * @swagger
 * /api/categories/{id}:
 *  get:
 *     summary: return a categorie
 *     tags: [Categorie]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *              required: true
 *     responses:
 *      200:
 *        description: return a categorie
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/  /schemas/Categorie'
 *      404:
 *         description: user not found
 */


/** --------------DELETE------------------------------
 * @swagger
 * /api/categories/{id}:
 *  delete:
 *     summary: deleted a categorie
 *     tags: [Categorie]
 *     parameters:
 *        - in: header
 *          name: x-token
 *          schema:
 *              type: string
 *              required: true
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *              required: true
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 $ref: '#/components/schemas/Categorie'
 *     responses:
 *      200:
 *        description: deleted the categorie
 *
 *      400:
 *         description: can not delete the categorie
 *
 */



/** --------------POST------------------------------
 * @swagger
 * /api/categories/:
 *  post:
 *     summary: create a new categorie
 *     tags: [Categorie]
 *     parameters:
 *        - in: header
 *          name: x-token
 *          schema:
 *              type: string
 *              required: true
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 $ref: '#/components/schemas/Categorie'
 *     responses:
 *      201:
 *        description: create a new categorie
 *
 *      404:
 *         description: can not create a categorie
 */

/** --------------DELETE------------------------------
 * @swagger
 * /api/categories/{id}:
 *  put:
 *     summary: deleted a categorie
 *     tags: [Categorie]
 *     parameters:
 *        - in: header
 *          name: x-token
 *          schema:
 *              type: string
 *              required: true
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *              required: true
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 $ref: '#/components/schemas/Categorie'
 *     responses:
 *      200:
 *        description: deleted the categorie
 *
 *      400:
 *         description: can not delete the categorie
 *
 */
//=============== PATH END ================================
//=============== PATH END ================================
//=============== PATH END ================================
//=============== PATH END ================================
//=============== PATH END ================================
//=============== PATH END ================================
