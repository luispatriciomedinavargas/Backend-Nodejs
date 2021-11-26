const Role = require('../models/rol');
const Usuario = require('../models/usuario');

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
        new Error(`El id: ${id} no existe y/o no se puede actualizar `);
    }
};


module.exports = {
    esRolValido,
    esEmailValido,
    existID
}



