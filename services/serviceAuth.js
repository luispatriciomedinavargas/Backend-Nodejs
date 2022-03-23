const Usuario = require("../models/usuario");
const { repositoryExistUser,
    repositoryValidPassword } = require("../repository/repositoryAuth");


const serviceExistUser = (email) => {
    return repositoryExistUser(email);
}


const serviceValidPass = (password, usuario) => {
    return repositoryValidPassword(password, usuario);

}



module.exports = {
    serviceExistUser,
    serviceValidPass
}


