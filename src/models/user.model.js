import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // Revisar las validaciones en deepseek
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio."],
        trim: true,
        minlength: [2, "El nombre debe tener al menos 2 caracteres."],
        maxlength: [50, "El nombre debe tener como máximo 50 caracteres."],
        match: [
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            "El nombre debe contener solo letras y espacios.",
        ],
    },
    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio."],
        trim: true,
        minlength: [2, "El apellido debe tener al menos 2 caracteres."],
        maxlength: [50, "El apellido debe tener como máximo 50 caracteres."],
        match: [
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            "El apellido debe contener solo letras y espacios.",
        ],
    },
    telefono: {
        type: String,
        required: [true, "El número de teléfono es obligatorio."],
        trim: true,
        minlength: [10, "El número de teléfono debe tener al menos 10 dígitos."],
        maxlength: [10, "El número de teléfono debe tener como máximo 10 dígitos."],
        match: [
            /^[0-9]+$/,
            "El número de teléfono debe contener solo dígitos.",
        ],
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es obligatorio."],
        trim: true,
        lowercase: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "El correo electrónico no es válido.",
        ],
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria."],
        trim: true,
        minlength: [8, "La contraseña debe tener al menos 8 caracteres."],
        maxlength: [50, "La contraseña debe tener como máximo 50 caracteres."],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.",
        ],
        select: false,
    },
    rol: {
        type: String,
        required: [true, "El rol es obligatorio."],
        enum: ["admin", "user"],
        default: "user",
    },
    adress: {
        calle: {
            type: String,
            required: [true, "La calle es obligatoria."],
            trim: true,
            minlength: [2, "La calle debe tener al menos 2 caracteres."],
            maxlength: [50, "La calle debe tener como máximo 50 caracteres."],
        },
        altura: {
            type: String,
            required: [true, "El número de altura es obligatorio."],
            trim: true,
            minlength: [1, "El número de altura debe tener al menos 1 dígito."],
            maxlength: [10, "El número de altura debe tener como máximo 10 dígitos."],
            match: [/^[0-9]+[A-Za-z]?$/, 'La altura debe ser un número válido (puede incluir letra)']
        },
        piso: {
            type: String,
            trim: true,
            minlength: [1, "El número de piso debe tener al menos 1 dígito."],
            maxlength: [10, "El número de piso debe tener como máximo 10 dígitos."],
            match: [/^[0-9]+[A-Za-z]?$/, 'El piso debe ser un número válido'],
            default: '',
        },
        departamento: {
            type: String,
            trim: true,
            match: [/^[A-Za-z0-9]+$/, 'El departamento solo puede contener letras y números'],
            maxlength: [5, 'El departamento no puede exceder los 5 caracteres'],
            uppercase: true,
            default: '',
        },
        localidad: {
            type: String,
            required: [true, "La localidad es obligatoria."],
            trim: true,
            minlength: [2, "La localidad debe tener al menos 2 caracteres."],
            maxlength: [50, "La localidad debe tener como máximo 50 caracteres."],
        },
        provincia: {
            type: String,
            required: [true, "La provincia es obligatoria."],
            trim: true,
            minlength: [2, "La provincia debe tener al menos 2 caracteres."],
            maxlength: [100, "La provincia debe tener como máximo 50 caracteres."],
            default: 'Buenos Aires',
        },
        pais: {
            type: String,
            required: [true, "El pais es obligatorio."],
            trim: true,
            minlength: [2, "El pais debe tener al menos 2 caracteres."],
            maxlength: [100, "El pais debe tener como máximo 50 caracteres."],
            default: 'Argentina',
        },
        codigoPostal: {
            type: String,
            required: [true, "El codigo postal es obligatorio."],
            trim: true,
            maxlength: [10, "El codigo postal debe tener como máximo 10 caracteres."],
        },
    },
    redes_sociales: {
        facebook: {
            type: String,
            trim: true,
            match: [/^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9._%+-]+$/, 'La URL de Facebook debe ser válida']
        },
        instagram: {
            type: String,
            trim: true,
            match: [/^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._%+-]+$/, 'La URL de Instagram debe ser válida']
        },
        twitter: {
            type: String,
            trim: true,
            match: [/^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9._%+-]+$/, 'La URL de Twitter debe ser válida']
        },
    },
    fecha_de_nacimiento: {
        type: Date,
        required: [true, "La fecha de nacimiento es obligatoria."],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;