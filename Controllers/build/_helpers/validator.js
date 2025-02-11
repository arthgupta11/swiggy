"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const priceSchema = joi_1.default.object({
    priceKey: joi_1.default.string().min(3).max(10).required().messages({
        'string.base': '"priceKey" must be a string',
        'string.min': '"priceKey" must be at least 3 characters long',
        'string.max': '"priceKey" must be at most 10 characters long',
        'any.required': '"priceKey" is required',
    }),
    priceValue: joi_1.default.number().positive().required().messages({
        'number.base': '"priceValue" must be a number',
        'number.positive': '"priceValue" must be positive',
        'any.required': '"priceValue" is required',
    }),
});
exports.ValidateSchema = joi_1.default.object({
    id: joi_1.default.number().required(),
    name: joi_1.default.string().min(3).max(20).required(),
    description: joi_1.default.string().min(3).max(50),
    price: joi_1.default.array().items(priceSchema).messages({
        'array.base': '"prices" must be an array of price objects',
    }),
    categoryId: joi_1.default.number(),
    restrauntId: joi_1.default.number(),
});
