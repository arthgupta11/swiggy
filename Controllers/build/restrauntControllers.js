"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestrauntsController = void 0;
// RestrauntsController.ts
const src_1 = require("Db/src");
const sendError_1 = require("./_helpers/sendError");
const transFormData_1 = require("./_helpers/transFormData");
const getMaxId_1 = require("./_helpers/getMaxId");
const validator_1 = require("./_helpers/validator");
class RestrauntsController {
    constructor() {
        this.getSqlFilteredData = async (_, { id }) => {
            console.log('id-->', id);
            try {
                src_1.Restraunts.hasMany(src_1.Categories, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.Subcategories, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.Products, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.Addons, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.ProductCategories, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.ProductSubcategories, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.ProductAddons, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.ProductRecommendedProducts, {
                    foreignKey: 'restraunt_id',
                });
                src_1.Categories.hasMany(src_1.Subcategories, { foreignKey: 'category_id' });
                src_1.Categories.belongsToMany(src_1.Products, {
                    through: src_1.ProductCategories,
                    foreignKey: 'category_id',
                    otherKey: 'product_id',
                });
                src_1.Subcategories.belongsToMany(src_1.Products, {
                    through: src_1.ProductSubcategories,
                    foreignKey: 'subcategory_id',
                    otherKey: 'product_id',
                });
                src_1.Products.belongsToMany(src_1.Addons, {
                    through: src_1.ProductAddons,
                    foreignKey: 'product_id',
                    otherKey: 'addon_id',
                });
                src_1.Products.belongsToMany(src_1.Products, {
                    through: src_1.ProductRecommendedProducts,
                    as: 'relatedProducts',
                    foreignKey: 'product_id',
                    otherKey: 'recommended_productid',
                });
                const restraunts = await src_1.Restraunts.findOne({
                    where: { id: id },
                    include: [
                        {
                            model: src_1.Categories,
                            include: [
                                {
                                    model: src_1.Subcategories,
                                    include: [
                                        {
                                            model: src_1.Products,
                                            include: [
                                                {
                                                    model: src_1.Addons,
                                                },
                                                {
                                                    model: src_1.Products,
                                                    as: 'relatedProducts',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    model: src_1.Products,
                                    include: [
                                        {
                                            model: src_1.Addons,
                                        },
                                    ],
                                },
                            ],
                        },
                        src_1.Products,
                    ],
                });
                console.log('req data');
                const response = restraunts?.get({ plain: true });
                console.log(JSON.stringify(response.Categories));
                return response;
            }
            catch (error) {
                (0, sendError_1.sendServerError)(error);
            }
        };
        this.nestedFetchAllData = async (_, { id }) => {
            try {
                console.log('id------>', id);
                src_1.Restraunts.hasMany(src_1.Categories, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.ProductCategories, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.ProductAddons, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.ProductRecommendedProducts, {
                    foreignKey: 'restraunt_id',
                });
                src_1.Restraunts.hasMany(src_1.ProductSubcategories, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.Subcategories, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.Products, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.Addons, { foreignKey: 'restraunt_id' });
                src_1.Categories.hasMany(src_1.Subcategories, { foreignKey: 'category_id' });
                // Subcategories.hasMany(Products,{foreignKey: ''} )
                src_1.Categories.belongsTo(src_1.Restraunts, { foreignKey: 'restraunt_id' });
                src_1.Subcategories.belongsTo(src_1.Categories, { foreignKey: 'category_id' });
                const restraunt = await src_1.Restraunts.findOne({
                    where: { id: id, isDeleted: false },
                    include: [
                        {
                            model: src_1.Categories,
                        },
                        src_1.Subcategories,
                        src_1.Products,
                        src_1.Addons,
                        src_1.ProductCategories,
                        src_1.ProductSubcategories,
                        src_1.ProductAddons,
                        src_1.ProductRecommendedProducts,
                    ],
                });
                const data = restraunt?.get({ plain: true });
                const response = (0, transFormData_1.transformData)(data);
                console.log('DATAAAA', response.Categories[1].Subcategories[0].products);
                // console.log(JSON.stringify(response));
                return response;
            }
            catch (error) {
                (0, sendError_1.sendServerError)(error);
            }
        };
        this.fetchAllData = async (_, { id }) => {
            console.log(id);
            console.log('_________________________');
            try {
                src_1.Restraunts.hasMany(src_1.Categories, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.ProductCategories, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.ProductAddons, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.ProductRecommendedProducts, {
                    foreignKey: 'restraunt_id',
                });
                src_1.Restraunts.hasMany(src_1.ProductSubcategories, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.Subcategories, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.Products, { foreignKey: 'restraunt_id' });
                src_1.Restraunts.hasMany(src_1.Addons, { foreignKey: 'restraunt_id' });
                src_1.Categories.hasMany(src_1.Subcategories, { foreignKey: 'category_id' });
                // Subcategories.hasMany(Products,{foreignKey: ''} )
                src_1.Categories.belongsTo(src_1.Restraunts, { foreignKey: 'restraunt_id' });
                src_1.Subcategories.belongsTo(src_1.Categories, { foreignKey: 'category_id' });
                const restraunt = await src_1.Restraunts.findOne({
                    where: { id: id },
                    include: [
                        {
                            model: src_1.Categories,
                        },
                        src_1.Subcategories,
                        src_1.Products,
                        src_1.Addons,
                        src_1.ProductCategories,
                        src_1.ProductSubcategories,
                        src_1.ProductAddons,
                        src_1.ProductRecommendedProducts,
                    ],
                });
                const response = restraunt?.get({ plain: true });
                return response;
            }
            catch (error) {
                (0, sendError_1.sendServerError)(error);
            }
        };
        this.getRestraunts = async () => {
            try {
                const restraunts = await src_1.Restraunts.findAll({
                    where: {
                        isDeleted: false,
                    },
                });
                return restraunts;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.getAllRestraunts = async () => {
            try {
                const restraunts = await src_1.Restraunts.findAll();
                return restraunts;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.addRestraunt = async (_, input) => {
            try {
                const data = {
                    id: await (0, getMaxId_1.getMaxId)(src_1.Restraunts),
                    name: input.name,
                };
                console.log(data);
                const validationResponse = validator_1.ValidateSchema.validate(data);
                if (validationResponse.error) {
                    console.log(validationResponse.error);
                    return (0, sendError_1.sendClientError)('Incorrect datav validation failed');
                }
                else {
                    console.log(validationResponse);
                    const response = await src_1.Restraunts.create(data);
                    return response.get({ plain: true });
                }
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.hardDeleteRestraunt = async (_, { id }) => {
            const t = await src_1.sequelize.transaction();
            try {
                await src_1.Restraunts.destroy({
                    where: { id: id },
                    force: true,
                    transaction: t,
                });
                // Commit transaction
                await t.commit();
                return `Item of id -> ${id} deleted succcessfully`;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.softDeleteRestraunt = async (_, { id }) => {
            const t = await src_1.sequelize.transaction();
            try {
                await src_1.Restraunts.update({ isDeleted: true, deletedAt: new Date() }, { where: { id: id }, transaction: t });
                // List of tables to update
                const tables = [src_1.Categories, src_1.Subcategories, src_1.Products, src_1.Addons];
                // Execute updates in parallel using Promise.all
                await Promise.all(tables.map((model) => model.update({ isDeleted: true, deletedAt: new Date() }, { where: { restraunt_id: id }, transaction: t })));
                // Commit transaction
                await t.commit();
                return `Item of id -> ${id} deleted succcessfully`;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.updateRestraunt = async (_, { id, name }) => {
            try {
                const [affectedRows, updatedRestraunts] = await src_1.Restraunts.update({ name: name, modifiedAt: new Date() }, // Data to be updated
                { where: { id: id }, returning: true } // Condition and return updated rows
                );
                // Return the updated record
                return 'Restraunt updated successfully'; // Return the first updated row (as an object)
            }
            catch (error) {
                return 'server error';
            }
        };
    }
}
exports.RestrauntsController = RestrauntsController;
