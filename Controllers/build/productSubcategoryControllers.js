"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSubcategoriesController = void 0;
// ProductSubcategoriesController.ts
const src_1 = require("Db/src");
const sendError_1 = require("./_helpers/sendError");
const getMaxId_1 = require("./_helpers/getMaxId");
class ProductSubcategoriesController {
    constructor() {
        this.getProductSubcategories = async () => {
            try {
                const productSubcategories = await src_1.ProductSubcategories.findAll({
                    where: {
                        isDeleted: false,
                    },
                });
                return productSubcategories;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.getAllProductSubcategories = async () => {
            try {
                const productSubcategories = await src_1.ProductSubcategories.findAll();
                return productSubcategories;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.addProductSubcategory = async (_, { productId, subcategoryId, restrauntId, }) => {
            try {
                const data = {
                    id: await (0, getMaxId_1.getMaxId)(src_1.ProductSubcategories),
                    productId: productId,
                    subcategoryId: subcategoryId,
                    restrauntId: restrauntId,
                };
                const response = await src_1.ProductSubcategories.create(data);
                return response.get({ plain: true });
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.softDeleteProductSubcategory = async (_, { id }) => {
            try {
                const response = await src_1.ProductSubcategories.update({ isDeleted: true, deletedAt: new Date() }, { where: { id: id }, returning: true });
                return 'Item deleted succcessfully';
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.updateProductSubcategory = async (_, args) => {
            try {
                const updateData = {};
                // Dynamically populate updateData with only provided fields
                if (args.productId)
                    updateData.productId = args.productId;
                if (args.subcategoryId)
                    updateData.subcategoryId = args.subcategoryId;
                if (args.restrauntId)
                    updateData.restrauntId = args.restrauntId;
                updateData.modifiedAt = new Date(); // Always update modifiedAt
                const [affectedRows] = await src_1.ProductSubcategories.update(updateData, {
                    where: { id: args.id },
                    returning: true,
                });
                if (affectedRows === 0) {
                    return 'No product category found with the provided ID';
                }
                return 'product category mapping updated successfully';
            }
            catch (error) {
                console.error('Error updating product:', error);
                return 'Server error';
            }
        };
    }
}
exports.ProductSubcategoriesController = ProductSubcategoriesController;
