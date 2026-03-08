import mongoose from "mongoose";
/* 
La orden tendrá las siguientes características:
    - estado: verifica que sea de tipo Strnig, requerido y que los poisbles valrores sean pendiente, preparado, enviado, recibido, cancelado
    - fecha: verifica que sea de tipo Date, requerido y que se la fecha actual
*/

const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        required: [true, "El estado de la orden es obligatorio."],
        enum: ["pendiente", "preparado", "enviado", "recibido", "cancelado"],
        index: true
    },
    fecha: {
        type: Date,
        required: [true, "La fecha de la orden es obligatoria."],
        default: Date.now,
        index: true
    },
    pedido: {
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "El producto es obligatorio."],
            validate: {
                validator: async function (value) {
                    const product = await mongoose.model("Product").findById(value);
                    return product !== null && product.isActive;
                },
                message: "El producto no existe o no esta disponible."
            },
        },
        cantidad: {
            type: Number,
            required: [true, "La cantidad es obligatoria."],
            min: [1, "La cantidad debe ser mayor o igual a 1."],
            index: true
        }
    },
    telefono: {
        type: String,
        required: [true, "El telefono es obligatorio."],
        trim: true,
        validate: {
            // Validar que sea formato argentino
            validator: function (value) {
                return /^\+54\d{9}$/.test(value);
            },
            message: "El telefono debe ser de formato argentino."
        }
    },
    direccion: {
        calle: {
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
    /* Agrego el nombre del comprador, pero no es un Usuario. Puede agregar el nombre completo en el campo (es decir, nombre + apellido) */
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio."],
        trim: true,
        minlength: [2, "El nombre debe tener al menos 2 caracteres."],
        maxlength: [50, "El nombre debe tener como máximo 50 caracteres."],
    },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;