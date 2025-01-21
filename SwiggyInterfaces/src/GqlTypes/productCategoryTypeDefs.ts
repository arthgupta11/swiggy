import { gql } from 'apollo-server';

export const ProductCategoryTypeDefs = gql`
 
  type ProductCategory {
    id: Int!
    productId: Int
    categoryId: Int
    createdAt: String
    modifiedAt: String
    deletedAt: String
    isDeleted: Boolean!
  }
  type Query {
   getProductCategories: [ProductCategory]
    getAllProductCategories: [ProductCategory]
  }
  type Mutation {
    addProductCategory(productId: Int, categoryId: Int, restrauntId: Int): ProductCategory
    softDeleteProductCategory(id: Int): String
    updateProductCategory(id: Int!, productId: Int, categoryId: Int, restrauntId: Int): String
  }
`;