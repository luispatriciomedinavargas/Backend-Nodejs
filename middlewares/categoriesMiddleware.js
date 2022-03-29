const {check}=require('express-validator');
const { existCategoriaID,existCategoriaName}=require('../helpers/db-validators')
const {errorWrapperFunction}=require('./index');
const { validarJWT } = require('./validar-jwt');
const { checkRol, hasRole } = require('./validar-rol');

const categoriesGetById=[
  check('id').custom(existCategoriaID),
  errorWrapperFunction,
]



const categoriesPost=[
  validarJWT,
  check('name','the name is required').notEmpty(),
  check('name','the name most be empty').isString(),
  errorWrapperFunction
]


const categoriesPut=[
  validarJWT,
  check('id','the id is not valid').isMongoId(),
  check('id').custom(existCategoriaID),
  check('name','the name must be required').notEmpty(),
  check('name','the name must be a string').isString(),
  check('name').custom(existCategoriaName),
  errorWrapperFunction
]


const categoriesDelete
=[
  validarJWT,
  check('id','the id is not valid').isMongoId(),
  check('id').custom(existCategoriaID),
  check('state','the state is required').notEmpty(),
  check('state','the state is a boolean').isBoolean(),
  checkRol,
  hasRole('ADMIN_ROLE'),
  errorWrapperFunction
]


module.exports={
  categoriesGetById,
  categoriesPost,
  categoriesPut,
  categoriesDelete
}
