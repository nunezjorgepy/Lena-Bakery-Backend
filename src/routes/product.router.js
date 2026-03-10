import express from "express";
import productController from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get(
    "/", 
    productController.getAllProducts
);

productRouter.get(
    "/:id", 
    productController.getProductById
);

productRouter.post(
    "/", 
    productController.createProduct
);

productRouter.put(
    "/:id", 
    productController.updateProduct
);

productRouter.delete(
    "/:id", 
    productController.deleteProduct
);

productRouter.patch(
    "/:id/soft-delete", 
    productController.softDeleteProduct
);

productRouter.patch(
    "/:id/restore", 
    productController.restoreProduct
);

/* 
productRouter.put(
    "/:id", 
    productController.updateProduct
);

productRouter.delete(
    "/:id", 
    productController.deleteProduct
);

productRouter.patch(
    "/:id", 
    productController.softDeleteProduct
);

productRouter.put(
    "/:id", 
    productController.restoreProduct
); */

export default productRouter;