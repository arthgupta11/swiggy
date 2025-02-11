import sequelize from './config/Database';
import Restraunts from './Models/restraunts';
import Addons from './Models/addOns';
import Categories from './Models/categories';
import CategorySubcategories from './Models/categorySubcategories';
import ProductAddons from './Models/productAddons';
import ProductCategories from './Models/productCategories';
import Products from './Models/products';
import ProductRecommendedProducts from './Models/productsRecommendedProducts';
import ProductSubcategories from './Models/productSubcategories';
import Subcategories from './Models/subcategories';

sequelize
  .sync()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err: unknown) => {
    console.error('Database connection error:', err);
  });

export {
  Restraunts,
  Addons,
  Categories,
  CategorySubcategories,
  ProductAddons,
  ProductCategories,
  Products,
  ProductRecommendedProducts,
  ProductSubcategories,
  Subcategories,
  sequelize,
};
