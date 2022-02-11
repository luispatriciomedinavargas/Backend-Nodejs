const { Categoria, Usuario, Role, Product } = require('../models');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD `)
    }
    return
};

const esEmailValido = async (correo = '') => {
    const existemail = await Usuario.findOne({ correo });
    if (existemail) {
        throw new Error(`El correo: ${correo} ya esta registrado`);
    }
    return
};

const existID = async (id) => {
    const checkID = await Usuario.findById(id);
    if (!checkID) {
        throw new Error(`El id: ${id} no existe y/o no se puede actualizar `);
    }
    return
};

const existCategoriaID = async (id) => {
    const checkID = await Categoria.findById(id);
    if (!checkID) {
        throw new Error
            (`El id: ${id} no existe y/o no se puede actualizar `);
    }
    return
};
const existProductoByID = async (id) => {
    const checkID = await Product.findById(id);
    if (!checkID) {
        throw new Error
            (`El id: ${id} no existe y/o no se puede actualizar `);
    }
    return
};
const checkPrice = async (price) => {
    if (price < 0) {
        throw new Error('el precio no puede ser menor a 0')
    }
    return;
};
// Validar colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const includa = colecciones.includes(coleccion);
    if (!includa) {
        throw new Error(`la coleccion ${coleccion} no es permitida, colecciones validas son: ${colecciones}`);
    }
    return true;
};
const checkStock = (stock) => {
    if (stock === 0) {
        return res.status(400).json({
            msg: 'el stock es 0 no puede vender un producto sin stock'
        })
    }
};
const checkAmount = (stockProducto, stock) => {

}
module.exports = {
    esRolValido,
    esEmailValido,
    existID,
    existCategoriaID,
    existProductoByID,
    coleccionesPermitidas,
    checkPrice,
    checkStock,
    checkAmount
}



