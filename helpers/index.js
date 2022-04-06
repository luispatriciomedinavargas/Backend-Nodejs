const dbValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const subir_Archivo = require('./subir-archivo');
const query = ({ state: true });


module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...subir_Archivo,
    query
}