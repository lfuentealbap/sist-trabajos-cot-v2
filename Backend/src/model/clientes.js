const mongoose = require("mongoose");
const schema = mongoose.Schema;
const clienteSchema = schema(
    {
        nombre_completo:{
            type: String,
            required: true
        },
        rut:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true
        },
        telefono:{
            type: String,
            required: true
        },
        direccion:{
            type: String,
            required: true
        },
        ciudad:{
            type: String,
            required: true
        }
    }
)
module.exports = mongoose.model('cliente', clienteSchema);