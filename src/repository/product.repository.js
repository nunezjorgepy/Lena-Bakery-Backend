import Product from "../models/product.model";

class ProductRepository {
    constructor() {
        this.model = Product;
    }

    async createProduct(product) {
        return await this.model.create(product);
    }

    async getAllProducts() {
        return await this.model.find();
    }

    async getProductById(id) {
        return await this.model.findById(id);
    }

    async updateProduct(id, product) {
        return await this.model.findByIdAndUpdate(id, product, { new: true });
    }

    async deleteProduct(id) {
        // OJO: esto es un borrado físico. No se puede deshacer
        return await this.model.findByIdAndDelete(id);
    }

    async softDeleteProduct(id) {
        // Borrado lógico. Al no estar activo, no se muestr en la página, pero se puede recuperar.
        return await this.model.findByIdAndUpdate(id, { isActive: false }, { new: true });
    }

    async restoreProduct(id) {
        // Restaurar un producto borrado lógicamente
        return await this.model.findByIdAndUpdate(id, { isActive: true }, { new: true });
    }
}

const productRepository = new ProductRepository();
export default productRepository;