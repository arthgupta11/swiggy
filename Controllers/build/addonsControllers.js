"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddonsController = void 0;
// AddonsController.ts
const src_1 = require("Db/src");
const sendError_1 = require("./_helpers/sendError");
const getMaxId_1 = require("./_helpers/getMaxId");
const validator_1 = require("./_helpers/validator");
const transFormData_1 = require("./_helpers/transFormData");
class AddonsController {
    constructor() {
        this.getAddons = async () => {
            try {
                const addons = await src_1.Addons.findAll({
                    where: {
                        isDeleted: false,
                    },
                });
                return addons;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.getAllAddons = async () => {
            try {
                const addons = await src_1.Addons.findAll();
                return addons;
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.addAddon = async (_, { name, description, price, restrauntId, }) => {
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
                let data = {
                    id: await (0, getMaxId_1.getMaxId)(src_1.Addons),
                    name: name,
                    description: description,
                    price: price,
                    restrauntId: restrauntId,
                };
                const validationResponse = validator_1.ValidateSchema.validate(data);
                if (validationResponse.error) {
                    console.log(validationResponse.error);
                    return (0, sendError_1.sendClientError)('Incorrect datav validation failed');
                }
                else {
                    console.log(validationResponse);
                    data = {
                        ...data, // Spread all existing properties
                        price: (0, transFormData_1.transformPriceArray)(price), // Update only the price field
                    };
                    const response = await src_1.Addons.create(data);
                    return response.get({ plain: true });
                }
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.softDeleteAddon = async (_, { id }) => {
            try {
                const response = await src_1.Addons.update({ isDeleted: true, deletedAt: new Date() }, { where: { id: id }, returning: true });
                return 'Item deleted succcessfully';
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.hardDeleteAddon = async (_, { id }) => {
            const t = await src_1.sequelize.transaction();
            try {
                await src_1.Addons.destroy({ where: { id: id }, force: true });
                await src_1.ProductAddons.destroy({ where: { addon_id: id }, force: true });
                await t.commit();
                return 'Item deleted succcessfully';
            }
            catch (error) {
                return (0, sendError_1.sendServerError)(error);
            }
        };
        this.updateAddon = async (_, args) => {
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
                const [affectedRows] = await src_1.Addons.update(updateData, {
                    where: { id: args.id },
                    returning: true,
                });
                if (affectedRows === 0) {
                    return 'No addon found with the provided ID';
                }
                return 'addon updated successfully';
            }
            catch (error) {
                console.error('Error updating addon:', error);
                return 'Server error';
            }
        };
    }
}
exports.AddonsController = AddonsController;
