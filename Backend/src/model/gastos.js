const mongoose = require("mongoose");
const schema = mongoose.Schema;
const gastoSchema = schema(
    {
        nombre:{
            type: String,
            required: true
        },
        detalle:{
            type: String,
            required: true
        },
        tipo:{
            type: String,
            required: true
        },
        monto:{
            type: Number,
            required: true
        },
        fecha:{
            type: Date,
            required: true
        },
        usuario: [{
            type: schema.ObjectId,
            ref:"usuario"
        }]
    }
)
module.exports = mongoose.model('gasto', gastoSchema);