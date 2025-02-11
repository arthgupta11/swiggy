"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRecommendedProductsController = exports.productAddonController = exports.productSubcategoryController = exports.addonController = exports.productCategoryController = exports.productController = exports.categoryController = exports.subcategoryController = exports.restrauntsController = void 0;
const addonsControllers_1 = require("./addonsControllers");
const categoryControllers_1 = require("./categoryControllers");
const productAddons_1 = require("./productAddons");
const productCategoryControllers_1 = require("./productCategoryControllers");
const productControllers_1 = require("./productControllers");
const productRecommendedProductControllers_1 = require("./productRecommendedProductControllers");
const productSubcategoryControllers_1 = require("./productSubcategoryControllers");
const restrauntControllers_1 = require("./restrauntControllers");
const subcategoryControllers_1 = require("./subcategoryControllers");
// Create an instance of the RestrauntsController
const restrauntsController = new restrauntControllers_1.RestrauntsController();
exports.restrauntsController = restrauntsController;
const subcategoryController = new subcategoryControllers_1.SubcategoriesController();
exports.subcategoryController = subcategoryController;
const categoryController = new categoryControllers_1.CategoriesController();
exports.categoryController = categoryController;
const productController = new productControllers_1.ProductsController();
exports.productController = productController;
const addonController = new addonsControllers_1.AddonsController();
exports.addonController = addonController;
const productCategoryController = new productCategoryControllers_1.ProductCategoriesController();
exports.productCategoryController = productCategoryController;
const productSubcategoryController = new productSubcategoryControllers_1.ProductSubcategoriesController();
exports.productSubcategoryController = productSubcategoryController;
const productAddonController = new productAddons_1.ProductAddonsController();
exports.productAddonController = productAddonController;
const productRecommendedProductsController = new productRecommendedProductControllers_1.ProductRecommendedProductsController();
exports.productRecommendedProductsController = productRecommendedProductsController;
