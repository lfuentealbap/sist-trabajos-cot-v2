const mongoose = require("mongoose");
const schema = mongoose.Schema;
const usuarioSchema = schema(
    {
        nombres:{
            type: String,
            required: true
        },
        apellidos:{
            type: String,
            required: true
        },
        rut:{
            type: String,
            required: true,
            unique: true
        },
        rol:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        telefono:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        ciudad:{
            type: String,
            required: true
        }
    }
)
module.exports = mongoose.model('usuario', usuarioSchema);