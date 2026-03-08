import mongoose from "mongoose";

const QASchema = new mongoose.Schema({
    pregunta: {
        type: String,
        required: [true, "La pregunta es obligatoria."],
        trim: true,
        minlength: [5, "La pregunta debe tener al menos 2 caracteres."],
        maxlength: [500, "La pregunta debe tener como máximo 500 caracteres."],
        unique: true,
        uniqueCaseInsensitive: true,
        match: [/^¿.+?$/, "La pregunta debe empezar con '¿' y terminar con '?'."],
    },
    respuesta: {
        type: String,
        required: [true, "La respuesta es obligatoria."],
        trim: true,
        minlength: [2, "La respuesta debe tener al menos 2 caracteres."],
        maxlength: [500, "La respuesta debe tener como máximo 500 caracteres."],
        uniqueCaseInsensitive: true,
    },
    isActive: {
        type: Boolean,
        required: [true, "El estado es obligatorio."],
        default: true,
        index: true,
    },
    timestpamps: true,
    orden: {
        type: Number,
        default: 0,
        min: [0, "El orden debe ser un número entero."],
    },
});

const QAndA = mongoose.model("QAndA", QASchema);

export default QAndA;