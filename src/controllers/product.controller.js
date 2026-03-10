import mongoose from "mongoose";
import ServerError from "../helper/error.helper.js";
import productRepository from "../repository/product.repository.js";

class ProductController {
    async getAllProducts(req, res) {
        try {
            // Obtiene todos los productos
            const products = await productRepository.getAllProducts();
            return res.status(200).json({
                message: "Productos encontrados",
                status: 200,
                data: {
                    products
                }
            })
        } catch (error) {
            if (error instanceof ServerError) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                });
            }

            return res.status(500).json({
                ok: false,
                message: "Error al obtener los productos",
                status: 500
            });
        }
    }

    async getProductById(req, res) {
        const { id } = req.params;
        try {
            // Verifica si la ID es válida para mongoose
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new ServerError("ID no válida", 400);
            }

            // Busca el producto por ID
            const product = await productRepository.getProductById(id);

            // Verifica si el producto existe
            if (!product) {
                throw new ServerError("Producto no encontrado", 404);
            }

            // Verifica si el producto está activo
            if (!product.isActive) {
                throw new ServerError("Producto no activo", 404);
            }

            // Devuelve el producto
            return res.status(200).json({
                message: "Producto encontrado",
                status: 200,
                data: {
                    product
                }
            })
        } catch (error) {
            if (error instanceof ServerError) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                });
            }

            return res.status(500).json({
                ok: false,
                message: "Error al obtener el producto",
                status: 500
            })
        }
    }

    async createProduct(req, res) {
        const product = req.body;
        try {
            /* Verifica si el nombre del producto ya existe */
            const productExists = await productRepository.getProductByName(product.title);
            if (productExists) {
                throw new ServerError("Nombre de producto existente", 400);
            }

            // Crea el producto
            const productCreated = await productRepository.createProduct(product);
            return res.status(201).json({
                message: "Producto creado",
                status: 201,
                data: {
                    productCreated
                }
            })
        } catch (error) {
            if (error instanceof ServerError) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                });
            }

            console.log(error);
            return res.status(500).json({
                ok: false,
                message: "Error al crear el producto",
                status: 500
            })
        }
    }

    async updateProduct(req, res) {
        const { id } = req.params;
        const updatedProduct = req.body;
        try {
            // Verifica si la ID es válida para mongoose
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new ServerError("ID no válida", 400);
            }

            // Busca el producto por ID
            const product = await productRepository.getProductById(id);

            // Verifica si el producto existe
            if (!product) {
                throw new ServerError("Producto no encontrado", 404);
            }

            // Verifica si el producto está activo
            if (!product.isActive) {
                throw new ServerError("Producto no activo", 404);
            }

            // Actualiza el producto
            const productUpdated = await productRepository.updateProduct(id, updatedProduct);
            return res.status(200).json({
                message: "Producto actualizado",
                status: 200,
                data: {
                    productUpdated
                }
            })
        } catch (error) {
            if (error instanceof ServerError) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                });
            }

            console.log(error);
            return res.status(500).json({
                ok: false,
                message: "Error al actualizar el producto",
                status: 500
            })
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            // Verifica si la ID es válida para mongoose
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new ServerError("ID no válida", 400);
            }

            // Busca el producto por ID
            const product = await productRepository.getProductById(id);

            // Verifica si el producto existe
            if (!product) {
                throw new ServerError("Producto no encontrado", 404);
            }

            // Elimina el producto
            const productDeleted = await productRepository.deleteProduct(id);
            return res.status(200).json({
                message: "Producto eliminado",
                status: 200,
                data: {
                    productDeleted
                }
            })
        } catch (error) {
            if (error instanceof ServerError) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                });
            }

            console.log(error);
            return res.status(500).json({
                ok: false,
                message: "Error al eliminar el producto",
                status: 500
            })
        }
    }

    async softDeleteProduct(req, res) {
        const { id } = req.params;
        try {
            // Verifica si la ID es válida para mongoose
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new ServerError("ID no válida", 400);
            }

            // Busca el producto por ID
            const product = await productRepository.getProductById(id);

            // Verifica si el producto existe
            if (!product) {
                throw new ServerError("Producto no encontrado", 404);
            }

            // Elimina el producto
            const productDeleted = await productRepository.softDeleteProduct(id);
            return res.status(200).json({
                message: "Producto desactivado",
                status: 200,
                data: {
                    productDeleted
                }
            })
        } catch (error) {
            if (error instanceof ServerError) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                });
            }

            console.log(error);
            return res.status(500).json({
                ok: false,
                message: "Error al desactivar el producto",
                status: 500
            })
        }
    }

    async restoreProduct(req, res) {
        const { id } = req.params;
        try {
            // Verifica si la ID es válida para mongoose
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new ServerError("ID no válida", 400);
            }

            // Busca el producto por ID
            const product = await productRepository.getProductById(id);

            // Verifica si el producto existe
            if (!product) {
                throw new ServerError("Producto no encontrado", 404);
            }

            // Elimina el producto
            const productDeleted = await productRepository.restoreProduct(id);
            return res.status(200).json({
                message: "Producto restaurado",
                status: 200,
                data: {
                    productDeleted
                }
            })
        } catch (error) {
            if (error instanceof ServerError) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                });
            }

            console.log(error);
            return res.status(500).json({
                ok: false,
                message: "Error al restaurar el producto",
                status: 500
            })
        }
    }
    
}


const productController = new ProductController();
export default productController;