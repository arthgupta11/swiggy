"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRecommendedProductsController = void 0;
// ProductRecommendedProductsController.ts
const src_1 = require("Db/src");
const sendError_1 = require("./_helpers/sendError");
const getMaxId_1 = require("./_helpers/getMaxId");
class ProductRecommendedProductsController {
    constructor() {
        this.getProductRecommendedProducts = async () => {
            try {
                const productProductRecommendedProducts = await src_1.ProductRecommendedProducts.findAll({
                    where: {
                        isDeleted: false,
                    },
                });
                return productProductRecommendedProducts;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.getAllProductRecommendedProducts = async () => {
            try {
                const productProductRecommendedProducts = await src_1.ProductRecommendedProducts.findAll();
                return productProductRecommendedProducts;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.addProductRecommendedProduct = async (_, { productId, recommendedProductId, restrauntId, }) => {
            console.log(productId);
            try {
                const data = {
                    id: await (0, getMaxId_1.getMaxId)(src_1.ProductRecommendedProducts),
                    productId: productId,
                    recommendedProductId: recommendedProductId,
                    restrauntId: restrauntId,
                };
                const response = await src_1.ProductRecommendedProducts.create(data);
                return response.get({ plain: true });
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.softDeleteProductRecommendedProduct = async (_, { id }) => {
            try {
                const response = await src_1.ProductRecommendedProducts.update({ isDeleted: true, deletedAt: new Date() }, { where: { id: id }, returning: true });
                return 'Item deleted succcessfully';
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.updateProductRecommendedProduct = async (_, args) => {
            try {
                const updateData = {};
                // Dynamically populate updateData with only provided fields
                if (args.productId)
                    updateData.productId = args.productId;
                if (args.recommendedProductId)
                    updateData.recommendedProductId = args.recommendedProductId;
                if (args.restrauntId)
                    updateData.restrauntId = args.restrauntId;
                updateData.modifiedAt = new Date(); // Always update modifiedAt
                const [affectedRows] = await src_1.ProductRecommendedProducts.update(updateData, {
                    where: { id: args.id },
                    returning: true,
                });
                if (affectedRows === 0) {
                    return 'No product recommendedProduct found with the provided ID';
                }
                return 'product recommendedProduct mapping updated successfully';
            }
            catch (error) {
                console.error('Error updating product:', error);
                return 'Server error';
            }
        };
    }
}
exports.ProductRecommendedProductsController = ProductRecommendedProductsController;
