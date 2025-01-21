import GraphQLJSON from 'graphql-type-json';
import {categoryController, productController, restrauntsController, subcategoryController, addonController, productCategoryController, productAddonController, productRecommendedProductsController, productSubcategoryController }from 'Controllers/src';
import { ProductSubcategoriesController } from 'Controllers/src/productSubcategoryControllers';

import 'dotenv/config'
import { CategoriesController } from 'Controllers/src/categoryControllers';

const deleteType = process.env.DELETE_TYPE
export const resolvers = {
  
  JSON: GraphQLJSON,

    Query: {
      getAllNestedData: restrauntsController.nestedFetchAllData,
      getRestraunts: restrauntsController.getRestraunts,
      getAllRestraunts: restrauntsController.getAllRestraunts,
      getAllData: restrauntsController.fetchAllData,
      // getSqlFilteredData: restrauntsController.getSqlFilteredData,
        
      getCategories: categoryController.getCategories,
      getAllCategories: categoryController.getAllCategories,

      getSubcategories: subcategoryController.getSubcategories,
      getAllSubcategories: subcategoryController.getAllSubcategories,

      getProducts: productController.getProducts,
      getAllProducts: productController.getAllProducts,

      getAddons: addonController.getAddons,
      getAllAddons: addonController.getAllAddons,
 
      getProductCategories: productCategoryController.getProductCategories,
      getAllProductCategories: productCategoryController.getAllProductCategories,

      getProductAddons: productAddonController.getProductAddons,
      getAllProductAddons: productAddonController.getAllProductAddons,

 
      getProductSubcategories: productSubcategoryController.getProductSubcategories,
      getAllProductSubcategories: productSubcategoryController.getAllProductSubcategories,
      
      getRecommendedProducts: productRecommendedProductsController.getProductRecommendedProducts,
      getAllRecommendedProducts: productRecommendedProductsController.getAllProductRecommendedProducts,
  },
   Mutation:{
      addRestraunt: restrauntsController.addRestraunt,
      // softDeleteRestraunt: restrauntsController.softDeleteRestraunt,
      // hardDeleteRestraunt: restrauntsController.hardDeleteRestraunt,
      DeleteRestraunt: deleteType == 'SOFT'? restrauntsController.softDeleteRestraunt : restrauntsController.hardDeleteRestraunt,
      updateRestraunt: restrauntsController.updateRestraunt,
 
      addCategory: categoryController.addCategory,
     //  softDeleteCategory: categoryController.softDeleteCategory,
     //  hardDeleteCategory: categoryController.hardDeleteCategory,
     DeleteCategory: deleteType == 'SOFT'? categoryController.softDeleteCategory : categoryController.hardDeleteCategory ,
     updateCategory: categoryController.updateCategory,
 
     addSubcategory: subcategoryController.addSubcategory,
     //  softDeleteSubcategory: subcategoryController.softDeleteSubcategory,
     //  hardDeleteSubcategory: subcategoryController.hardDeleteSubcategory,
     DeleteSubcategory: deleteType == 'SOFT'? subcategoryController.softDeleteSubcategory : subcategoryController.hardDeleteSubcategory ,
     
     updateSubcategory: subcategoryController.updateSubcategory,

     addProduct: productController.addProduct,
     //  softDeleteProduct: productController.softDeleteProduct,
     //  hardDeleteProduct: productController.hardDeleteProduct,
     DeleteProduct: deleteType == 'SOFT'? productController.softDeleteProduct : productController.hardDeleteProduct ,
     updateProduct: productController.updateProduct,

     addAddon: addonController.addAddon,
    //  softDeleteAddon: addonController.softDeleteAddon,
    //  hardDeleteAddon: addonController.hardDeleteAddon,
     DeleteAddon: deleteType == 'SOFT'? addonController.softDeleteAddon : addonController.hardDeleteAddon,
      
     updateAddon: addonController.updateAddon,

     addProductCategory: productCategoryController.addProductCategory,
     softDeleteProductCategory: productCategoryController.softDeleteProductCategory,
     updateProductCategory: productCategoryController.updateProductCategory,

     addProductAddon: productAddonController.addProductAddon,
     softDeleteProductAddon: productAddonController.softDeleteProductAddon,
     updateProductAddon: productAddonController.updateProductAddon,
    

     addProductSubcategory : productSubcategoryController.addProductSubcategory,
     softDeleteProductSubcategory: productSubcategoryController.softDeleteProductSubcategory,
     updateProductSubcategory : productSubcategoryController.updateProductSubcategory,
      

     addRecommendedProduct: productRecommendedProductsController.addProductRecommendedProduct,
     softDeleteRecommendedProduct: productRecommendedProductsController.softDeleteProductRecommendedProduct,
     updateRecommendedProduct: productRecommendedProductsController.updateProductRecommendedProduct,
    
    }
}; 