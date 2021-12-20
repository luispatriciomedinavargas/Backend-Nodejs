const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    name: {
        type: String,
        require: [true, "El nombre del rol es obligatorio"]
    },
    state: {
        type: Boolean,
        require: true,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    price: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        require: true
    },
    description: {
        type: String,
    },
    disponible: {
        type: Boolean,
        default: true
    }
});


ProductoSchema.methods.toJSON = function () {
    const { __v, state, ...data } = this.toObject();

    return data;
}
module.exports = model('product', ProductoSchema);