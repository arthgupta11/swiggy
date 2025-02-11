"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
// ProductsController.ts
const src_1 = require("Db/src");
const sendError_1 = require("./_helpers/sendError");
const getMaxId_1 = require("./_helpers/getMaxId");
const validator_1 = require("./_helpers/validator");
const containsDuplicates_1 = require("./_helpers/containsDuplicates");
const transFormData_1 = require("./_helpers/transFormData");
class ProductsController {
    constructor() {
        this.getProducts = async () => {
            try {
                const products = await src_1.Products.findAll({
                    where: {
                        isDeleted: false,
                    },
                });
                return products;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.getAllProducts = async () => {
            try {
                const products = await src_1.Products.findAll();
                return products;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.addProduct = async (_, { name, description, price, restrauntId, }) => {
            try {
                const restaurant = await src_1.Restraunts.findOne({
                    where: {
                        id: restrauntId,
                        isDeleted: false, // Only allow active restaurants
                    },
                });
                if (!restaurant) {
                    (0, sendError_1.sendClientError)('Cannot add category to a deleted or non-existent restaurant');
                }
                if ((0, containsDuplicates_1.containsDuplicate)(price) == false) {
                    let data = {
                        id: await (0, getMaxId_1.getMaxId)(src_1.Products),
                        name: name,
                        description: description,
                        price: price,
                        restrauntId: restrauntId,
                    };
                    console.log(data);
                    const validationResponse = validator_1.ValidateSchema.validate(data);
                    if (validationResponse.error) {
                        console.log(validationResponse.error);
                        return (0, sendError_1.sendClientError)('Incorrect data validation failed');
                    }
                    else {
                        console.log(validationResponse);
                        data = {
                            ...data, // Spread all existing properties
                            price: (0, transFormData_1.transformPriceArray)(price), // Update only the price field
                        };
                        const response = await src_1.Products.create(data);
                        return response.get({ plain: true });
                    }
                }
                else {
                    return (0, sendError_1.sendClientError)('duplicate price data not allowed');
                }
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.hardDeleteProduct = async (_, { id }) => {
            const t = await src_1.sequelize.transaction();
            try {
                await src_1.Products.destroy({
                    where: { id: id },
                    force: true,
                    transaction: t,
                });
                await src_1.ProductRecommendedProducts.destroy({
                    where: { recommended_productid: id },
                    force: true,
                    transaction: t,
                });
                const tables = [
                    src_1.ProductCategories,
                    src_1.ProductSubcategories,
                    src_1.ProductAddons,
                    src_1.ProductRecommendedProducts,
                ];
                await Promise.all(tables.map((model) => model.destroy({
                    where: { product_id: id },
                    force: true,
                    transaction: t,
                })));
                // Commit transaction
                await t.commit();
                return `Product and its mapping of id -> ${id} deleted succcessfully`;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.softDeleteProduct = async (_, { id }) => {
            const t = await src_1.sequelize.transaction();
            try {
                await src_1.Products.update({ isDeleted: true, deletedAt: new Date() }, { where: { id: id }, transaction: t });
                await src_1.ProductRecommendedProducts.update({ isDeleted: true, deletedAt: new Date() }, { where: { recommended_productid: id }, transaction: t });
                // List of tables to update
                const tables = [
                    src_1.ProductCategories,
                    src_1.ProductSubcategories,
                    src_1.ProductAddons,
                    src_1.ProductRecommendedProducts,
                ];
                // Execute updates in parallel using Promise.all
                await Promise.all(tables.map((model) => model.update({ isDeleted: true, deletedAt: new Date() }, { where: { product_id: id }, transaction: t })));
                // Commit transaction
                await t.commit();
                return `Product deleted of id--> ${id} succcessfully`;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.updateProduct = async (_, args) => {
            try {
                const updateData = {};
                // Dynamically populate updateData with only provided fields
                if (args.name)
                    updateData.name = args.name;
                if (args.description)
                    updateData.description = args.description;
                if (args.price)
                    updateData.price = args.price;
                if (args.restrauntId)
                    updateData.restrauntId = args.restrauntId;
                updateData.modifiedAt = new Date(); // Always update modifiedAt
                const [affectedRows] = await src_1.Products.update(updateData, {
                    where: { id: args.id },
                    returning: true,
                });
                if (affectedRows === 0) {
                    return 'No product found with the provided ID';
                }
                return 'product updated successfully';
            }
            catch (error) {
                console.error('Error updating product:', error);
                return 'Server error';
            }
        };
    }
}
exports.ProductsController = ProductsController;
