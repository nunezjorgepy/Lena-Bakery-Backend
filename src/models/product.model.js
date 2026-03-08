import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    foto: {
        type: String,
        required: [true, "La foto es obligatoria."],
        trim: true,
        validate: {
            validator: function (value) {
                return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg|bmp))($|\?)/i.test(value) ||
                /^data:image\/[a-z]+;base64,/.test(value);
            },
            message: 'La URL de la foto debe ser válida.'
        },
        maxlength: [1000, "La URL de la foto debe tener como máximo 1000 caracteres."],
    },
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres'],
        unique: true, // Asumiendo que los nombres de productos son únicos
        uniqueCaseInsensitive: true // Ignorar mayúsculas/minúsculas para la unicidad
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del producto es obligatoria'],
        trim: true,
        minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
        maxlength: [1000, 'La descripción no puede exceder los 1000 caracteres'],
    },
    precio: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio'],
        min: [0, 'El precio debe ser mayor o igual a 0'],
    },
    ingredientes: [{
        nombre: {
            type: String,
            required: [true, 'El nombre del ingrediente es obligatorio'],
            trim: true,
            minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
            maxlength: [100, 'El nombre no puede exceder los 100 caracteres'],
            unique: true, // Asumiendo que los nombres de ingredientes son únicos
            uniqueCaseInsensitive: true // Ignorar mayúsculas/minúsculas para la unicidad
        },
        cantidad: {
            type: Number,
            required: [true, 'La cantidad del ingrediente es obligatoria'],
            min: [0, 'La cantidad debe ser mayor o igual a 0'],
            validate: function(value) {
                return value < 0 || (value === 0 && this.notas);
            },
            message: 'La cantidad debe ser mayor o igual a 0 si no hay notas'
        },
        unidad: {
            type: String,
            required: [true, 'La unidad de medida es obligatoria'],
            enum: {
                values: ['g', 'kg', 'ml', 'l', 'unidad', 'cucharada', 'cucharadita', 'taza', 'pizca', 'al gusto'],
                message: '{VALUE} no es una unidad válida'
            },
            uppercase: true, // Normalizar a mayúsculas
            trim: true
        },
        notas: {
            type: String,
            trim: true,
            maxlength: [200, 'Las notas no pueden exceder los 200 caracteres'],
            default: ''
        }
    }],
    informacion_nutricional: [{
        nombre: {
            type: String,
            required: [true, 'El nombre del componente nutricional es obligatorio'],
            trim: true,
            enum: {
                values: [
                'Calorías', 'Proteínas', 'Grasas Totales', 'Grasas Saturadas', 
                'Grasas Trans', 'Carbohidratos', 'Azúcares', 'Fibra', 'Sodio',
                'Colesterol', 'Vitamina A', 'Vitamina C', 'Calcio', 'Hierro',
                'Potasio', 'Magnesio', 'Zinc', 'Vitamina D', 'Vitamina B12'
                ],
                message: '{VALUE} no es un componente nutricional válido'
            }
        },
        cantidad: {
            type: Number,
            required: [true, 'La cantidad del componente nutricional es obligatoria'],
            min: [0, 'La cantidad debe ser mayor o igual a 0']
        },
        unidad: {
            type: String,
            required: [true, 'La unidad de medida es obligatoria'],
            enum: {
                values: ['g', 'mg', 'mcg', 'kcal', 'kJ', 'IU', '%'],
                message: '{VALUE} no es una unidad nutricional válida'
            },
            uppercase: true,
            trim: true
        },
        porcion_referencia: {
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
    timestamps: true
    // TODO: cómo revisar si hay algún producto que tenga menos de una semana para el pop-up
})

const Product = mongoose.model('Product', productSchema);

export default Product;