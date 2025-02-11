import Restraunts from '../Models/restraunts';
import Categories from '../Models/categories';
import Subcategories from '../Models/subcategories';
import { Sequelize } from 'sequelize-typescript';
import Products from '../Models/products';
import Addons from '../Models/addOns';
import ProductCategories from '../Models/productCategories';
import ProductSubcategories from '../Models/productSubcategories';
import ProductAddons from '../Models/productAddons';
import ProductRecommendedProducts from '../Models/productsRecommendedProducts';
import CategorySubcategories from '../Models/categorySubcategories';
// Import models here

const sequelize = new Sequelize({
  database: 'swiggy',
  dialect: 'mysql',
  username: 'root',
  password: '12345',
  models: [
    Restraunts,
    Categories,
    Subcategories,
    Products,
    Addons,
    ProductCategories,
    ProductSubcategories,
    ProductAddons,
    ProductRecommendedProducts,
    CategorySubcategories,
  ],
  // Register your models
});

export default sequelize;
