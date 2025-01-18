import { gql } from 'apollo-server';

export const AddonTypeDefs = gql`
 
  type Addon {
    id: Int
    name: String!
    description: String
    price : JSON
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
    addAddon(id: Int, name: String, description: String,price: JSON, restrauntId: Int): Addon
    softDeleteAddon(id: Int): String
    updateAddon(id: Int!, name: String, description: String,price: JSON, restrauntId: Int): String
  }
`;