const mongoose = require("mongoose");
const schema = mongoose.Schema;
const cotizacionSchema = schema(
    {
        fecha_creacion:{
            type: Date,
            required: true
        },
        fecha_expiracion:{
            type: Date,
            required: true
        },
        neto:{
            type: Number,
            required: true
        },
        iva:{
            type: Number,
            required: true
        },
        total:{
            type: Number,
            required: true
        },
        estado:{
            type: String,
            required: true
        },
        descuento:{
            type: Number,
            required: true
        },
        cliente: [{
            type: schema.ObjectId,
            ref:"cliente"
        }]
    }
)
module.exports = mongoose.model('cotizacion', cotizacionSchema);