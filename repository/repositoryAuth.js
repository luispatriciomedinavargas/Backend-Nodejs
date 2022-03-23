
const bcryptjs = require('bcryptjs');
const Usuario = require("../models/usuario")

const repositoryExistUser = async (correo) => {

    const user = await Usuario.findOne({ correo });

    return user
}

const repositoryValidPassword = (password, usuario) => {

    const validPassword = bcryptjs.compareSync(password, usuario.password)

    return validPassword
}


module.exports = {
    repositoryExistUser,
    repositoryValidPassword
}
