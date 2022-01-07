const { Categoria, Usuario, Role, Product } = require('../models');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD `)
    }
};

const esEmailValido = async (correo = '') => {
    const existemail = await Usuario.findOne({ correo });
    if (existemail) {
        throw new Error(`El correo: ${correo} ya esta registrado`);
    }
};

const existID = async (id) => {
    const checkID = await Usuario.findById(id);
    if (!checkID) {
        throw new Error(`El id: ${id} no existe y/o no se puede actualizar `);
    }
};

const existCategoriaID = async (id) => {
    const checkID = await Categoria.findById(id);
    if (!checkID) {
        throw new Error
            (`El id: ${id} no existe y/o no se puede actualizar `);
    }
};
const existProductoByID = async (id) => {
    const checkID = await Product.findById(id);
    if (!checkID) {
        throw new Error
            (`El id: ${id} no existe y/o no se puede actualizar `);
    }
};
// Validar colecciones permitidas

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const includa = colecciones.includes(coleccion);
    if (!includa) {
        throw new Error(`la coleccion ${coleccion} no es permitida, colecciones validas son: ${colecciones}`);
    }
    return true;
}
module.exports = {
    esRolValido,
    esEmailValido,
    existID,
    existCategoriaID,
    existProductoByID,
    coleccionesPermitidas
}



