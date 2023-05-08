const mongoose = require("mongoose");
const schema = mongoose.Schema;
const cotizacionProductoSchema = schema(
    {
        cantidad:{
            type: Date,
            required: true
        },
        subtotal:{
            type: Date,
            required: true
        },
        cotizacion: [{
            type: schema.ObjectId,
            ref:"cotizacion"
        }],
        producto: [{
            type: schema.ObjectId,
            ref:"producto"
        }],
    }
)
module.exports = mongoose.model('cotizacion_producto', cotizacionProductoSchema);