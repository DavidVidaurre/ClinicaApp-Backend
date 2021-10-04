const { Schema, model } = require('mongoose');
const VacunaSchema = new Schema({
    nombre_vacuna:{
        type: String,
        required: false
    },
    previene:{
        type: String,
        required: false
    },
    dosis:{
        type: String,
        required: false
    }
});

module.exports = model('Vacuna', VacunaSchema);