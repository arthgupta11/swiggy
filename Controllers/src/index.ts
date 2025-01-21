import { AddonsController } from './addonsControllers';
import { CategoriesController } from './categoryControllers';
import { ProductAddonsController } from './productAddons';
import { ProductCategoriesController } from './productCategoryControllers';
import { ProductsController } from './productControllers';
import { ProductRecommendedProductsController } from './productRecommendedProductControllers';
import { ProductSubcategoriesController } from './productSubcategoryControllers';
import { RestrauntsController } from './restrauntControllers';
import { SubcategoriesController } from './subcategoryControllers';

// Create an instance of the RestrauntsController
const restrauntsController = new RestrauntsController();
const subcategoryController = new SubcategoriesController();
const categoryController = new CategoriesController();
const productController = new ProductsController();
const addonController = new AddonsController();
const productCategoryController = new ProductCategoriesController();
const productSubcategoryController = new ProductSubcategoriesController();
const productAddonController = new ProductAddonsController();
const productRecommendedProductsController =
  new ProductRecommendedProductsController();

export {
  restrauntsController,
  subcategoryController,
  categoryController,
  productController,
  productCategoryController,
  addonController,
  productSubcategoryController,
  productAddonController,
  productRecommendedProductsController,
};
