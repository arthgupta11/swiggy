import { gql } from 'apollo-server';

export const ProductTypeDefs = gql`
  scalar JSON
  
  type Product {
    id: Int
    name: String!
    price: JSON
    description: String
    createdAt: String
    modifiedAt: String
    deletedAt: String
    isDeleted: Boolean!
  }
  type Query {
   getProducts: [Product]
   getAllProducts: [Product]
  }
  type Mutation {
    addProduct(id: Int, name: String, description: String,price: JSON, restrauntId: Int): Product
    softDeleteProduct(id: Int): String
    updateProduct(id: Int!, name: String, description: String,price: JSON, restrauntId: Int): String
  }
`;