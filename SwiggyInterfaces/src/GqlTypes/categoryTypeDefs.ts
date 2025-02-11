import { gql } from 'apollo-server';

export const CategoryTypeDefs = gql`
  type Category {
    id: Int
    name: String!
    description: String
    createdAt: String
    modifiedAt: String
    deletedAt: String
    isDeleted: Boolean!
    restrauntId: Int
  }

  type Query {
    getCategories: [Category]
    getAllCategories: [Category]
  }

  type Mutation {
    addCategory(name: String, description: String, restrauntId: Int): Category
    softDeleteCategory(id: Int): String
    hardDeleteCategory(id: Int): String
    DeleteCategory(id: Int): String
    updateCategory(id: Int, name: String): String
  }
`;
