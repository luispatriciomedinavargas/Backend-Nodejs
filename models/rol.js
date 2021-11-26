const { Schema, model } = require('mongoose');


const RoleSchema = Schema({
    rol: {
        type: String,
        require: [true, "El nombre del rol es obligatorio"]
    }
});



module.exports = model('role', RoleSchema);