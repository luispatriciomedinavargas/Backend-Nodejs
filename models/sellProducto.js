const { Schema, model } = require('mongoose');

const sellProductoSchema = Schema({
    price: {
        type: Number,
        require: [true, "El precio es obligatorio"]
    },
    state: {
        type: Boolean,
        require: true,
        default: true
    },
    products: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    stockSell: {
        type: Number,
        require: true
    },
    descripcion: {
        type: String,
    },
});


sellProductoSchema.methods.toJSON = function () {
    const { __v, state, ...data } = this.toObject();

    return data;
}
module.exports = model('sellProduct', sellProductoSchema);