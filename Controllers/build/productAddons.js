"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAddonsController = void 0;
// ProductAddonsController.ts
const src_1 = require("Db/src");
const sendError_1 = require("./_helpers/sendError");
const getMaxId_1 = require("./_helpers/getMaxId");
class ProductAddonsController {
    constructor() {
        this.getProductAddons = async () => {
            try {
                const productAddons = await src_1.ProductAddons.findAll({
                    where: {
                        isDeleted: false,
                    },
                });
                return productAddons;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.getAllProductAddons = async () => {
            try {
                const productAddons = await src_1.ProductAddons.findAll();
                return productAddons;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.addProductAddon = async (_, { productId, addonId, restrauntId, }) => {
            console.log(productId);
            try {
                const data = {
                    id: await (0, getMaxId_1.getMaxId)(src_1.ProductAddons),
                    productId: productId,
                    addonId: addonId,
                    restrauntId: restrauntId,
                };
                const response = await src_1.ProductAddons.create(data);
                return response.get({ plain: true });
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.softDeleteProductAddon = async (_, { id }) => {
            try {
                const response = await src_1.ProductAddons.update({ isDeleted: true, deletedAt: new Date() }, { where: { id: id }, returning: true });
                return 'Item deleted succcessfully';
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.updateProductAddon = async (_, args) => {
            try {
                const updateData = {};
                // Dynamically populate updateData with only provided fields
                if (args.productId)
                    updateData.productId = args.productId;
                if (args.addonId)
                    updateData.addonId = args.addonId;
                if (args.restrauntId)
                    updateData.restrauntId = args.restrauntId;
                updateData.modifiedAt = new Date(); // Always update modifiedAt
                const [affectedRows] = await src_1.ProductAddons.update(updateData, {
                    where: { id: args.id },
                    returning: true,
                });
                if (affectedRows === 0) {
                    return 'No product addon found with the provided ID';
                }
                return 'product addon mapping updated successfully';
            }
            catch (error) {
                console.error('Error updating product:', error);
                return 'Server error';
            }
        };
    }
}
exports.ProductAddonsController = ProductAddonsController;
