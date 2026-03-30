import mongoose from "mongoose";

// TODO: crear una colección de ingredientes para pasarlos como parámetros. de esta manera, puedo agregar o quitar ingredientes de forma más sencilla.

const productSchema = new mongoose.Schema({
    /* TODO: photo tendría que se una lista de fotos */
    main_photo: {
        type: String,
        required: [true, "La foto es obligatoria."],
        trim: true,
        /* validate: {
            validator: function (value) {
                return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg|bmp))($|\?)/i.test(value) ||
                /^data:image\/[a-z]+;base64,/.test(value);
            },
            message: 'La URL de la foto debe ser válida.'
        }, */
        maxlength: [1000, "La URL de la foto debe tener como máximo 1000 caracteres."],
    },
    title: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'La descripción del producto es obligatoria'],
        trim: true,
        minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
        maxlength: [1000, 'La descripción no puede exceder los 1000 caracteres'],
    },
    price: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio'],
        min: [0, 'El precio debe ser mayor o igual a 0'],
    },
    ingredients: [{
        name: {
            type: String,
            required: [true, 'El nombre del ingrediente es obligatorio'],
            trim: true,
            minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
            maxlength: [100, 'El nombre no puede exceder los 100 caracteres'],
            unique: true, // Asumiendo que los nombres de ingredientes son únicos
        },
        quantity: {
            type: Number,
            required: [true, 'La cantidad del ingrediente es obligatoria'],
            min: [0, 'La cantidad debe ser mayor o igual a 0'],
            validate: {
                validator: function(value) {
                    return value > 0 || (value === 0 && this.notes);
                },
                message: 'La cantidad debe ser mayor a 0 si no hay notas'
            }
        },
        unit: {
            type: String,
            required: [true, 'La unidad de medida es obligatoria'],
            enum: {
                values: ['g', 'kg', 'ml', 'l', 'unidad', 'cucharada', 'cucharadita', 'taza', 'pizca', 'al gusto'],
                message: '{VALUE} no es una unidad válida'
            },
            trim: true
        },
        notes: {
            type: String,
            trim: true,
            maxlength: [200, 'Las notas no pueden exceder los 200 caracteres'],
            default: ''
        }
    }],
    nutritional_information: [{
        name: {
            type: String,
            required: [true, 'El nombre del componente nutricional es obligatorio'],
            trim: true,
            /* enum: {
                values: nutritional_information_enum,
                message: '{VALUE} no es un componente nutricional válido'
            } */
        },
        quantity: {
            type: Number,
            required: [true, 'La cantidad del componente nutricional es obligatoria'],
            min: [0, 'La cantidad debe ser mayor o igual a 0']
        },
        unit: {
            type: String,
            required: [true, 'La unidad de medida es obligatoria'],
            enum: {
                values: ['g', 'mg', 'mcg', 'kcal', 'kJ', 'IU', '%'],
                message: '{VALUE} no es una unidad nutricional válida'
            },
            trim: true
        },
        reference_portion: {
            type: String,
            required: [true, 'La porción de referencia es obligatoria'],
            trim: true,
            validate: {
                validator: function(value) {
                // Ejemplos: "100g", "1 taza (240ml)", "1 unidad (50g)"
                return /^[\d\s\w\/\(\)]+$/.test(value);
                },
                message: 'Formato de porción de referencia inválido'
            },
            maxlength: [50, 'La porción de referencia no puede exceder los 50 caracteres']
        }
    }],
    isActive: {
        type: Boolean,
        default: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updated_at: {
        type: Date,
        default: Date.now,
        immutable: true
    }
    // TODO: cómo revisar si hay algún producto que tenga menos de una semana para el pop-up
})

const Product = mongoose.model('Product', productSchema);

export default Product;