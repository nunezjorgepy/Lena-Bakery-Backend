import Product from "../models/product.model.js";

class ProductRepository {

    async createProduct(product) {
        return await Product.create(product);
    }

    async getAllProducts() {
        return await Product.find();
    }

    async getProductById(id) {
        return await Product.findById(id);
    }

    async updateProduct(id, product) {
        return await Product.findByIdAndUpdate(id, product, { new: true });
    }

    async deleteProduct(id) {
        // OJO: esto es un borrado físico. No se puede deshacer
        return await Product.findByIdAndDelete(id);
    }

    async softDeleteProduct(id) {
        // Borrado lógico. Al no estar activo, no se muestr en la página, pero se puede recuperar.
        return await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
    }

    async restoreProduct(id) {
        // Restaurar un producto borrado lógicamente
        return await Product.findByIdAndUpdate(id, { isActive: true }, { new: true });
    }
}

const productRepository = new ProductRepository();
export default productRepository;