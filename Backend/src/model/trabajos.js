const mongoose = require("mongoose");
const schema = mongoose.Schema;
const trabajoSchema = schema(
    {
        titulo:{
            type: String,
            required: true
        },
        descripcion:{
            type: String,
            required: true
        },
        ciudad:{
            type: String,
            required: true
        },
        fecha_inicio:{
            type: Date,
            required: true
        },
        fecha_termino:{
            type: Date,
            required: true
        },
        pago:{
            type: Number,
            required: true
        },
        estado:{
            type: String,
            required: true
        },
        usuario: [{
            type: schema.ObjectId,
            ref:"usuario"
        }]
    }
)
module.exports = mongoose.model('trabajo', trabajoSchema);