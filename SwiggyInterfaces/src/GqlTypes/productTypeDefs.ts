import { gql } from 'apollo-server';

export const ProductTypeDefs = gql`
  scalar JSON


    input PriceInput {
    priceKey: String!
    priceValue: Int!
  }
  
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
    addProduct( name: String, description: String,price: [PriceInput], restrauntId: Int): Product
    softDeleteProduct(id: Int): String
    updateProduct(id: Int!, name: String, description: String,price: JSON , restrauntId: Int): String
  }
`;