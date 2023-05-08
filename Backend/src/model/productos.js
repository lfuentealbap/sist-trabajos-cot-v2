const mongoose = require("mongoose");
const schema = mongoose.Schema;
const productoSchema = schema(
    {
        nombre:{
            type: String,
            required: true
        },
        descripcion:{
            type: String,
            required: true
        },
        valor:{
            type: Number,
            required: true
        }
    }
)
module.exports = mongoose.model('producto', productoSchema);