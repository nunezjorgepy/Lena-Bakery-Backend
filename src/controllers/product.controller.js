import ServerError from "../helper/error.helper.js";
import productRepository from "../repository/product.repository.js";

class ProductController {
    async getAllProducts(req, res) {
        try {
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
            const product = await productRepository.getProductById(id);
            if (!product) {
                throw new ServerError("Producto no encontrado", 404);
            }

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
        console.log(product);
        try {
            /* TODO: Verificar si el producto ya existe */

            await productRepository.createProduct(product);
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

            /* console.log(error); */
            return res.status(500).json({
                ok: false,
                message: "Error al crear el producto",
                status: 500
            })
        }
    }
}


const productController = new ProductController();
export default productController;