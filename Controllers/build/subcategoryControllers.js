"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcategoriesController = void 0;
// subcategoriesController.ts
const src_1 = require("Db/src");
const sendError_1 = require("./_helpers/sendError");
const getMaxId_1 = require("./_helpers/getMaxId");
const validator_1 = require("./_helpers/validator");
class SubcategoriesController {
    constructor() {
        this.getSubcategories = async () => {
            try {
                const subcategories = await src_1.Subcategories.findAll({
                    where: {
                        isDeleted: false,
                    },
                });
                return subcategories;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.getAllSubcategories = async () => {
            try {
                const subcategories = await src_1.Subcategories.findAll();
                return subcategories;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.addSubcategory = async (_, { name, description, categoryId, restrauntId, }) => {
            try {
                const restaurant = await src_1.Restraunts.findOne({
                    where: {
                        id: restrauntId,
                        isDeleted: false, // Only allow active restaurants
                    },
                });
                const category = await src_1.Categories.findOne({
                    where: {
                        category_id: categoryId,
                        isDeleted: false, // Only allow active restaurants
                    },
                });
                if (!restaurant || !category) {
                    (0, sendError_1.sendClientError)('Cannot add category to a deleted or non-existent restaurant');
                }
                const data = {
                    id: await (0, getMaxId_1.getMaxId)(src_1.Subcategories),
                    name: name,
                    description: description,
                    categoryId: categoryId,
                    restrauntId: restrauntId,
                };
                const validationResponse = validator_1.ValidateSchema.validate(data);
                if (validationResponse.error) {
                    console.log(validationResponse.error);
                    return (0, sendError_1.sendClientError)('Incorrect datav validation failed');
                }
                else {
                    console.log(validationResponse);
                    const response = await src_1.Subcategories.create(data);
                    return response.get({ plain: true });
                }
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.hardDeleteSubcategory = async (_, { id }) => {
            const t = await src_1.sequelize.transaction();
            try {
                await src_1.Subcategories.destroy({
                    where: { id: id },
                    force: true,
                    transaction: t,
                });
                await src_1.ProductSubcategories.destroy({
                    where: { id: id },
                    force: true,
                    transaction: t,
                });
                // Commit transaction
                await t.commit();
                return `Subcategory and its mapping  of id -> ${id} deleted succcessfully`;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.softDeleteSubcategory = async (_, { id }) => {
            const t = await src_1.sequelize.transaction();
            try {
                await src_1.Subcategories.update({ isDeleted: true, deletedAt: new Date() }, { where: { id: id }, transaction: t });
                await src_1.ProductSubcategories.update({ isDeleted: true, deletedAt: new Date() }, { where: { subcategory_id: id }, transaction: t });
                // Commit transaction
                await t.commit();
                return `subcategory of id ----> ${id} deleted succcessfully`;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.updateSubcategory = async (_, args) => {
            try {
                const updateData = {};
                // Dynamically populate updateData with only provided fields
                if (args.name)
                    updateData.name = args.name;
                if (args.description)
                    updateData.description = args.description;
                if (args.categoryId)
                    updateData.categoryId = args.categoryId;
                if (args.restrauntId)
                    updateData.restrauntId = args.restrauntId;
                updateData.modifiedAt = new Date(); // Always update modifiedAt
                const [affectedRows] = await src_1.Subcategories.update(updateData, {
                    where: { id: args.id },
                    returning: true,
                });
                if (affectedRows === 0) {
                    return 'No subcategory found with the provided ID';
                }
                return 'Subcategory updated successfully';
            }
            catch (error) {
                console.error('Error updating subcategory:', error);
                return 'Server error';
            }
        };
    }
}
exports.SubcategoriesController = SubcategoriesController;
