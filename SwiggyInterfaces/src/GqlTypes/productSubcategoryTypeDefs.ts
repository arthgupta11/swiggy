import { gql } from 'apollo-server';

export const ProductSubcategoryTypeDefs = gql`
 
  type ProductSubcategory {
    id: ID!
    productId: Int
    subcategoryId: Int
    createdAt: String
    modifiedAt: String
    deletedAt: String
    isDeleted: Boolean!
  }
  type Query {
   getProductSubcategory: [ProductSubcategory]
   getAllProductSubcategories: [ProductSubcategory]
  }
  type Mutation {
    addProductSubcategory(id: Int, productId: Int, subcategoryId: Int, restrauntId: Int): ProductSubcategory
    softDeleteProductSubcategory(id: Int): String
    updateProductSubcategory(id: Int!, productId: Int, subcategoryId: Int, restrauntId: Int): String
  }
`;