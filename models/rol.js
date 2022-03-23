const { Schema, model } = require('mongoose');


const RoleSchema = Schema({
    rol: {
        type: String,
        require: [true, "El nombre del rol es obligatorio"]
    }
});


RoleSchema.methods.toJSON = function () {
    const { __v, state, ...data } = this.toObject();

    return data;
}

module.exports = model('role', RoleSchema);