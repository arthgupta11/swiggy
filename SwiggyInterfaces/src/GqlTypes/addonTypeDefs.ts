import { gql } from 'apollo-server';

export const AddonTypeDefs = gql`
  input PriceInput {
    priceKey: String!
    priceValue: Int!
  }

  type Addon {
    id: Int
    name: String!
    description: String
    price: JSON
    createdAt: String
    modifiedAt: String
    deletedAt: String
    isDeleted: Boolean!
  }
  type Query {
    getAddons: [Addon]
    getAllAddons: [Addon]
  }
  type Mutation {
    addAddon(
      name: String
      description: String
      price: [PriceInput]
      restrauntId: Int
    ): Addon
    softDeleteAddon(id: Int): String
    hardDeleteAddon(id: Int): String
    DeleteAddon(id: Int): String

    updateAddon(
      id: Int!
      name: String
      description: String
      price: JSON
      restrauntId: Int
    ): String
  }
`;
