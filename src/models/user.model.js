import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
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
    lastName: {
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
    phone: {
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
        maxlength: [255, "La contraseña debe tener como máximo 50 caracteres."],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.",
        ],
        select: false,
    },
    role: {
        type: String,
        required: [true, "El rol es obligatorio."],
        enum: ["admin", "user"],
        default: "user",
    },
    address: {
        street: {
            type: String,
            required: [true, "La calle es obligatoria."],
            trim: true,
            minlength: [2, "La calle debe tener al menos 2 caracteres."],
            maxlength: [50, "La calle debe tener como máximo 50 caracteres."],
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z0-9\s\.\-áéíóúñÁÉÍÓÚÑ]+$/.test(value);
                },
                message: "La calle debe contener solo letras y espacios.",
            }
        },
        number: {
            type: String,
            required: [true, "El número de altura es obligatorio."],
            trim: true,
            minlength: [1, "El número de altura debe tener al menos 1 dígito."],
            maxlength: [10, "El número de altura debe tener como máximo 10 dígitos."],
            match: [/^[0-9]+[A-Za-z]?$/, 'La altura debe ser un número válido (puede incluir letra)']
        },
        floor: {
            type: String,
            trim: true,
            maxlength: [10, "El número de piso debe tener como máximo 10 dígitos."],
            match: [/^[0-9]+[A-Za-z]?$/, 'El piso debe ser un número válido'],
            default: '0',
        },
        department: {
            type: String,
            trim: true,
            match: [/^[A-Za-z0-9]+$/, 'El departamento solo puede contener letras y números'],
            maxlength: [5, 'El departamento no puede exceder los 5 caracteres'],
            uppercase: true,
            default: '',
        },
        city: {
            type: String,
            required: [true, "La localidad es obligatoria."],
            trim: true,
            minlength: [2, "La localidad debe tener al menos 2 caracteres."],
            maxlength: [50, "La localidad debe tener como máximo 50 caracteres."],
        },
        province: {
            type: String,
            required: [true, "La provincia es obligatoria."],
            trim: true,
            minlength: [2, "La provincia debe tener al menos 2 caracteres."],
            maxlength: [100, "La provincia debe tener como máximo 50 caracteres."],
            default: 'Buenos Aires',
        },
        country: {
            type: String,
            required: [true, "El pais es obligatorio."],
            trim: true,
            minlength: [2, "El pais debe tener al menos 2 caracteres."],
            maxlength: [100, "El pais debe tener como máximo 50 caracteres."],
            default: 'Argentina',
        },
        zipCode: {
            type: String,
            required: [true, "El codigo postal es obligatorio."],
            trim: true,
            maxlength: [10, "El codigo postal debe tener como máximo 10 caracteres."],
        },
    },
    socialNetworks: {
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
    birthDate: {
        type: Date,
        required: [true, "La fecha de nacimiento es obligatoria."],
    },
    isActive: {
        // Se usa cuando: esta de vacaciones, esta ausente, se encuentra modificando los productos (evita que el cliente haga una compra desactualizada), ...
        type: Boolean,
        default: true,
    },
    isVerified: {
        // Se usa cuando: el usuario se ha verificado su correo electrónico
        type: null || Date,
        default: null,
    },
    verification_token: {
        type: String,
        default: null,
    },
    verification_token_expires_at: {
        type: Date,
        default: () => new Date(Date.now() + 60 * 60 * 1000),
    },
    created_at: {
        type: Date,
        default: Date.now,
        inmutable: true
    },
    updated_at: {
        type: Date,
        default: Date.now,
        inmutable: true
    }
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// Índice TTL para limpiar usuarios no verificados después de 24 horas
userSchema.index(
    { verification_token_expires_at: 1 },
    { expireAfterSeconds: 86400 },
    { partialFilterExpression: { isVerified: false } }
);

const User = mongoose.model("User", userSchema);

export default User;