"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
// categoriesController.ts
const src_1 = require("Db/src");
const sendError_1 = require("./_helpers/sendError");
const getMaxId_1 = require("./_helpers/getMaxId");
const validator_1 = require("./_helpers/validator");
class CategoriesController {
    constructor() {
        this.getCategories = async () => {
            try {
                const categories = await src_1.Categories.findAll({
                    where: {
                        isDeleted: false,
                    },
                });
                return categories;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.getAllCategories = async () => {
            try {
                const categories = await src_1.Categories.findAll();
                return categories;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.addCategory = async (_, { name, description, restrauntId, }) => {
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
                const data = {
                    id: await (0, getMaxId_1.getMaxId)(src_1.Categories),
                    name: name,
                    description: description,
                    restrauntId: restrauntId,
                };
                const validationResponse = validator_1.ValidateSchema.validate(data);
                if (validationResponse.error) {
                    console.log(validationResponse.error);
                    return (0, sendError_1.sendClientError)('Incorrect datav validation failed');
                }
                else {
                    console.log(validationResponse);
                    const response = await src_1.Categories.create(data);
                    return response.get({ plain: true });
                }
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.hardDeleteCategory = async (_, { id }) => {
            const t = await src_1.sequelize.transaction();
            try {
                await src_1.Categories.destroy({
                    where: { id: id },
                    force: true,
                    transaction: t,
                });
                // Commit transaction
                await t.commit();
                return `category of id -> ${id} deleted succcessfully`;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.softDeleteCategory = async (_, { id }) => {
            const t = await src_1.sequelize.transaction();
            try {
                await src_1.Categories.update({ isDeleted: true, deletedAt: new Date() }, { where: { id: id }, transaction: t });
                await src_1.Subcategories.update({ isDeleted: true, deletedAt: new Date() }, { where: { category_id: id }, transaction: t });
                // Commit transaction
                await t.commit();
                return 'Item deleted succcessfully';
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.updateCategory = async (_, { id, name }) => {
            try {
                const [affectedRows, updatedCategories] = await src_1.Categories.update({ name: name, modifiedAt: new Date() }, // Data to be updated
                { where: { id: id }, returning: true } // Condition and return updated rows
                );
                // Return the updated record
                return 'category updated successfully'; // Return the first updated row (as an object)
            }
            catch (error) {
                return 'server error';
            }
        };
    }
}
exports.CategoriesController = CategoriesController;
