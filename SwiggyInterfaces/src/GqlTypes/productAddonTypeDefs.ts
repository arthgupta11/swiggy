import { gql } from 'apollo-server';

export const ProductAddonTypeDefs = gql`
  type ProductAddon {
    id: Int
    productId: Int
    addonId: Int
    createdAt: String
    modifiedAt: String
    deletedAt: String
    isDeleted: Boolean!
  }
  type Query {
    getProductAddons: [ProductAddon]
    getAllProductAddons: [ProductAddon]
  }
  type Mutation {
    addProductAddon(
      productId: Int
      addonId: Int
      restrauntId: Int
    ): ProductAddon
    softDeleteProductAddon(id: Int): String
    updateProductAddon(
      id: Int!
      productId: Int
      addonId: Int
      restrauntId: Int
    ): String
  }
`;
