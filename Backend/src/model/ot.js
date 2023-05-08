const mongoose = require("mongoose");
const schema = mongoose.Schema;
const otSchema = schema(
    {
        nombre_colaborador:{
            type: String,
            required: true
        },
        fecha:{
            type: Date,
            required: true
        },
        direccion:{
            type: String,
            required: true
        },
        ciudad:{
            type: String,
            required: true
        },
        tipo_requerimiento:{
            type: String,
            required: true
        },
        detalles_equipo_antiguo:{
            type: String,
            required: true
        },
        detalles__equipo_nuevo:{
            type: String,
            required: true
        },
        descripcion_solucion:{
            type: String,
            required: true
        },
        observaciones:{
            type: String,
            required: true
        },
        firma:{
            type: String,
            required: true
        },
        usuario: [{
            type: schema.ObjectId,
            ref:"usuario"
        }],
        trabajo: [{
            type: schema.ObjectId,
            ref:"trabajo"
        }]
    }
)
module.exports = mongoose.model('ot', otSchema);