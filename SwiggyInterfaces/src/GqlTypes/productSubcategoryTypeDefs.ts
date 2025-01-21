import { gql } from 'apollo-server';

export const ProductSubcategoryTypeDefs = gql`
 
  type ProductSubcategory {
    id: Int
    productId: Int
    subcategoryId: Int
    createdAt: String
    modifiedAt: String
    deletedAt: String
    isDeleted: Boolean!
  }
  type Query {
   getProductSubcategories: [ProductSubcategory]
   getAllProductSubcategories: [ProductSubcategory]
  }
  type Mutation {
    addProductSubcategory( productId: Int, subcategoryId: Int, restrauntId: Int): ProductSubcategory
    softDeleteProductSubcategory(id: Int): String
    updateProductSubcategory(id: Int!, productId: Int, subcategoryId: Int, restrauntId: Int): String
  }
`;